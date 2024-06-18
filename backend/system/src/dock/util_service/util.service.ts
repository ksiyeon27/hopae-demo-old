import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { DidKey, VerificationRelationship } from '@docknetwork/sdk/public-keys';
import { MockPublicKey } from '../mock_public_key';
import * as bs58 from 'bs58';
@Injectable()
export class UtilService {
  publicJwkToDidKeys(jwk: crypto.webcrypto.JsonWebKey): DidKey[] {
    const stringifiedJwk = JSON.stringify(jwk);
    // 32자 단위로 나누기
    const chunkSize = 32;
    const chunks: string[] = [];
    for (let i = 0; i < stringifiedJwk.length; i += chunkSize) {
      const chunk = stringifiedJwk.slice(i, i + chunkSize);
      const chunkToPush = chunk.padEnd(chunkSize, ' ');
      console.log('chunkToPush:', `[ ${chunkToPush} ]`);
      chunks.push(chunkToPush);
    }
    return chunks.map((chunk) => {
      return new DidKey(
        new MockPublicKey(chunk),
        new VerificationRelationship(),
      );
    });
  }

  aggregateBase58KeysToJwk(
    publicKeyBase58s: string[],
  ): crypto.webcrypto.JsonWebKey {
    const stringifiedJwks = publicKeyBase58s
      .map((key) => {
        return this._decodeBase58(key);
      })
      .join('')
      .trimEnd();
    const aggregatedJwk = JSON.parse(stringifiedJwks);
    return aggregatedJwk as crypto.webcrypto.JsonWebKey;
  }

  _decodeBase58(value: string) {
    const bytes = bs58.decode(value);
    const decodedString = Buffer.from(bytes).toString('utf8');
    return decodedString;
  }
}
