import * as crypto from 'crypto';

export class Player {
  constructor(data?: Partial<Player>) {
    Object.assign(this, data);
  }
  id: string; //나의 did
  publicKey: crypto.webcrypto.JsonWebKey; //나의 publicKey
  privateKey: crypto.webcrypto.JsonWebKey; //나의 privateKey
}
