import { Injectable } from '@nestjs/common';
import dock from '@docknetwork/sdk';
import { DidKeypair } from '@docknetwork/sdk/utils/did';
import { DidKey, VerificationRelationship } from '@docknetwork/sdk/public-keys';
import { ES256 } from '@sd-jwt/crypto-nodejs';
import * as crypto from 'crypto';
import { MockPublicKey } from './mock_public_key';
@Injectable()
export class DockUpdateService {
  async testHash() {
    const { privateKey, publicKey } = await ES256.generateKeyPair();
    console.log(publicKey.x);
    console.log(publicKey.x.length);
    console.log(publicKey.y);
    console.log(publicKey.y.length);
    console.log(privateKey.y.length);
    return 'Test';
  }

  async addKey({ did, secretUri }: { did: string; secretUri: string }) {
    console.log('function --- addKey');
    console.log('did:', did);
    console.log('secretUri:', secretUri);
    // secret uri를 통해 만든 did, did doc이 이미 존재한다고 가정
    // secret uri 로 생성한 key pair는 항상 같음. 그래서 과거에 만든 did doc에 대해서, 이렇게 새로만든 key pair 객체를 통해서도 접근이 가능.
    const alreadySignedKeyPair = new DidKeypair(
      dock.keyring.addFromUri(secretUri),
      1,
    );

    const newKeyRing = dock.keyring.addFromUri('//NewKeySeed');
    const newKeyPair = new DidKeypair(newKeyRing);
    const newPulicKey = newKeyPair.publicKey();
    const vr = new VerificationRelationship();
    vr.setAuthentication();
    const newDidKey = new DidKey(newPulicKey, vr);

    console.log('newPublicKey:', newPulicKey);

    await dock.did.addKeys(
      [newDidKey],
      // target did - key를 추가할 did
      did,
      // signed did - key를 추가하기 위해 권한을 가진 did
      did,
      // signed did에 대응되는 key pair
      alreadySignedKeyPair,
      // 밑에 2개는 정확한 의미는 모르겠음.
      undefined,
      false,
    );
    console.log('async addKeys done');
  }
}
