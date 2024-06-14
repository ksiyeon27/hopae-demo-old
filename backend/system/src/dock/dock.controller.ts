import { Controller, Get, Post, Query } from '@nestjs/common';
import { DockService } from './dock.service';

@Controller('dock')
export class DockController {
  constructor(private dockService: DockService) {}

  // 기본적인 dock resolver 역할을 수행한다.
  @Get('resolve')
  async getDid(@Query('did') did: string | undefined) {
    await this.dockService.connectToNode();
    if (!did) {
      return 'did를 넣어주세용';
    }
    const result = await this.dockService.resolveDid(did);
    await this.dockService.disconnectNode();
    return result;
  }

  // dock substrate network에 did를 등록한다.
  // 아무런 옵션이 없는 현재 상태에서는 did, pk 모두 랜덤 값을 바탕으로 생성된다.
  // 현재 함수 구성 중, cratePublicKeyObjectByBytesAxHex 함수를 통해 생성한 pulic key는 private key를 따로 저장하고 있지 않다.
  // 그러므로, 이 api를 통해 생성한 결과는 did doc을 추후 조작하는데 있어서 사용할 수가 없다.
  @Post('register')
  async registerDid() {
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
}
