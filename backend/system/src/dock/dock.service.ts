import { Injectable } from '@nestjs/common';
import dock from '@docknetwork/sdk';
import { createNewDockDID } from '@docknetwork/sdk/utils/did';
import {
  dockAddress,
  secretUriOfEnoughBalanceAccountForDev,
} from '../core/dock-constants';
import { PublicKeyEd25519, PublicKeySr25519 } from '@docknetwork/sdk';
import * as crypto from 'crypto';
import { DidKey, VerificationRelationship } from '@docknetwork/sdk/public-keys';
import { MockPublicKey } from './mock_public_key';
import { DockDidUtilService } from './util_service/util.service';
import { ES256 } from '@sd-jwt/crypto-nodejs';

// pre defined random bytes as hex
// 혹시 몰라 미리 생성해놨고, 쓰인다면 이건 고정 seed로 사용될 것이다.

//5db458417b1bf92199ac3a73367ed3a9782e1411d4be6b40e14d160aa349303f
//25b39786fe5eb435c293e76f293dbbd4e5c5425b30037fbcf273cd4fa8079b53
//87bad1d2a7a6d5ddf3d698bbe4c7db2d9ea58a2c5cfdd26d44c3bcbe575cde6d
//2bac17c38465f9fe7a174ecc6a6dd76146473bba0d18dc3060b82946ea45bed2

@Injectable()
export class DockService {
  constructor(readonly dockDidUtilService: DockDidUtilService) {}

  secretUriForIssuer1 = '//Issuer1';
  secretUriForIssuer2 = '//Issuer2';
  secretUriForVerifier1 = '//Verifier1';
  secretUriForVerifier2 = '//Verifier2';
  secretUriForHolder1 = '//Holder1';
  secretUriForHolder2 = '//Holder2';

  async connectToNode() {
    console.log('function --- connectToNode');
    await dock.init({ address: dockAddress });
    // dev 모드에서 Alice 계정을 사용한다. Alice는 개발자에게 미리 제공된 계정이다.
    const account = dock.keyring.addFromUri(
      secretUriOfEnoughBalanceAccountForDev,
    );
    dock.setAccount(account);
  }

  createRandomDid(): string {
    console.log('function --- createRandomDid');
    // random DID 생성
    const did = createNewDockDID();
    return did as string;
  }

  getRandomBytesAsHex(): `0x${string}` {
    console.log('function --- getRandomBytesAsHex');
    const randomBytes = crypto.randomBytes(32);
    const bytesAsHex = randomBytes.toString('hex');
    return `0x${bytesAsHex}`;
  }

  createPublicKeyObjectByBytesAxHex(bytesAsHex: `0x${string}`) {
    console.log('function --- createPublicKeyObjectByBytesAxHex');
    const pk = new PublicKeyEd25519(bytesAsHex);
    return pk;
  }

  createKeyPairFromSecretUri(secretUri: string) {
    console.log('function --- createKeyPairFromSecretUri', secretUri);
    const keyPair = dock.keyring.addFromUri(secretUri);
    return keyPair;
  }

  getSr25519PublicKeyFromKeyPair(keypair) {
    console.log('function --- getPublicKeyFromKeyPair');
    const publicKey = PublicKeySr25519.fromKeyringPair(keypair);
    return publicKey;
  }

  async registerDidWithPublicKey(publicKey, did) {
    console.log('function --- registerDidWithPublicKey');
    // verification method 등, did doc을 구성함에 있어서 필요한 정보를 세팅하는 객체인 듯 하다.
    // set 을 통해 아래 객체를 더 조작할 수 있으나 하지 않고 기본으로 사용한다.
    const vr = new VerificationRelationship();
    const didKey = new DidKey(publicKey, vr);
    await dock.did.new(did, [didKey], [], false);
  }

  async registerDidWithDidKeys(didKeys: DidKey[], did: string) {
    console.log('function --- registerDidWithDidKeys');
    await dock.did.new(did, didKeys, [], false);
  }
  async disconnectNode() {
    console.log('function --- disconnectNode');
    await dock.disconnect();
  }

  async resolveDid(did: string) {
    console.log('function --- resolveDid');
    try {
      const result = await dock.did.getDocument(did);
      return result;
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  }
}
