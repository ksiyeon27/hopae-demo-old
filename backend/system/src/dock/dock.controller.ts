import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DockService } from './dock.service';
import { DockUpdateService } from './dock.update.service';
import { UtilService } from './util_service/util.service';
import { ES256 } from '@sd-jwt/crypto-nodejs';

@Controller('dock')
export class DockController {
  constructor(
    private dockService: DockService,
    private dockUpdateService: DockUpdateService,
    private utilService: UtilService,
  ) {}

  // 기본적인 dock resolver 역할을 수행한다.
  @Get('resolve')
  async getDid(@Query('did') did: string | undefined) {
    await this.dockService.connectToNode();
    if (!did) {
      return 'did를 넣어주세용';
    }
    const result = await this.dockService.resolveDid(did);
    await this.dockService.disconnectNode();
    if (result === undefined) {
      return '해당 did에 대한 정보가 없습니다.';
    }
    return result;
  }
  @Get('resolve/jwk')
  async getDidAndJwk(@Query('did') did: string | undefined) {
    await this.dockService.connectToNode();
    if (!did) {
      return 'did를 넣어주세용';
    }
    const result = await this.dockService.resolveDid(did);
    await this.dockService.disconnectNode();
    if (result === undefined) {
      return '해당 did에 대한 정보가 없습니다.';
    }
    const jwk = this.utilService.aggregateBase58KeysToJwk(
      result.publicKey.map((e) => e.publicKeyBase58),
    );
    return jwk;
  }

  // dock substrate network에 did를 등록한다.
  // 아무런 옵션이 없는 현재 상태에서는 did, pk 모두 랜덤 값을 바탕으로 생성된다.
  // 현재 함수 구성 중, cratePublicKeyObjectByBytesAxHex 함수를 통해 생성한 pulic key는 private key를 따로 저장하고 있지 않다.
  // 그러므로, 이 api를 통해 생성한 결과는 did doc을 추후 조작하는데 있어서 사용할 수가 없다.
  @Post('register-random')
  async registerDidWithRandomPk() {
    await this.dockService.connectToNode();
    const did = this.dockService.createRandomDid();
    const bytesAsHex = this.dockService.getRandomBytesAsHex();
    const pk = this.dockService.createPublicKeyObjectByBytesAxHex(bytesAsHex);
    await this.dockService.registerDidWithPublicKey(pk, did);
    await this.dockService.disconnectNode();
    return {
      msg: 'success',
      detail: {
        did,
        pk,
      },
    };
  }

  @Post('register-secretUri')
  async registerDidWithSecretUri(@Body('secretUri') secretUri: string) {
    await this.dockService.connectToNode();
    const did = this.dockService.createRandomDid();
    const keyPair = this.dockService.createKeyPairFromSecretUri(secretUri);
    const pk = this.dockService.getSr25519PublicKeyFromKeyPair(keyPair);
    await this.dockService.registerDidWithPublicKey(pk, did);
    await this.dockService.disconnectNode();
    return {
      msg: 'success',
      detail: {
        did,
        pk,
      },
    };
  }

  @Post('register-jwk')
  async registerDidWithJwk(@Body('jwk') jwk?: JsonWebKey) {
    let jwkToUse: JsonWebKey;
    await this.dockService.connectToNode();
    try {
      if (jwk === undefined) {
        console.log('jwk 그냥 새로 생성!');
        jwkToUse = (await ES256.generateKeyPair()).publicKey;
      } else {
        console.log('jwk 받은 거 사용!');
        jwkToUse = jwk;
      }
      console.log('jwkToUse - pulic key :', jwkToUse);
      const did = this.dockService.createRandomDid();
      const didKeys = this.utilService.publicJwkToDidKeys(jwkToUse);
      await this.dockService.registerDidWithDidKeys(didKeys, did);
      return {
        msg: 'success',
        detail: {
          did,
          jwkToUse,
        },
      };
    } catch (error) {
    } finally {
      await this.dockService.disconnectNode();
    }
  }

  @Post('add-key')
  async addKey(@Body() body: { did: string; secretUri: string }) {
    if (!body.did || !body.secretUri) {
      return 'did, secretUri를 넣어주세요';
    }
    const { did, secretUri } = body;
    await this.dockService.connectToNode();
    await this.dockUpdateService.addKey({ did, secretUri });
    await this.dockService.disconnectNode();
    return 'fin';
  }
}
