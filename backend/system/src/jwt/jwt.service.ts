import { Injectable } from '@nestjs/common';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { Claims } from 'src/issuer/dto/claims.dto';
import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import type { DisclosureFrame } from '@sd-jwt/types';
import * as crypto from 'crypto';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class JwtService {
  private issuer;
  private holder;

  async createPlayer(player_id: string, type: string): Promise<Player> {
    const { privateKey, publicKey } = await ES256.generateKeyPair();
    const player = new Player({
      id: player_id,
      type: type,
      publicKey: publicKey,
      privateKey: privateKey,
    });
    if (player.type === 'holder') {
      this.holder = player;
      // console.log(this.holder);
    } else if (player.type === 'issuer') {
      this.issuer = player;
      // console.log(this.issuer);
    }

    return player;
  }

  getIssuer(): Player {
    console.log(this.issuer);
    return this.issuer;
  }

  getHolder(): Player {
    console.log(this.holder);
    return this.holder;
  }

  async createSigner(privateKey: crypto.webcrypto.JsonWebKey) {
    return await ES256.getSigner(privateKey);
  }

  async createVerifier(publicKey: crypto.webcrypto.JsonWebKey) {
    return await ES256.getVerifier(publicKey);
  }

  async create_vc_jwt(
    claims: Claims,
    vc_id: string,
    holder_did: string,
  ): Promise<string> {
    const issuer = this.getIssuer();
    console.log(issuer);
    const issuer_signer = await this.createSigner(issuer.privateKey);

    const issuer_instance = new SDJwtVcInstance({
      signer: issuer_signer,
      signAlg: 'EdDSA', //ES256?
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    // Issuer Define the disclosure frame to specify which claims can be disclosed
    // 일단 4개 항목 다 sd 로 넣음
    const disclosureFrame: DisclosureFrame<typeof claims> = {
      _sd: ['department', 'position', 'join', 'leave'],
    };

    // Issue a signed JWT credential with the specified claims and disclosures
    // Return a Encoded SD JWT. Issuer send the credential to the holder
    const credential = await issuer_instance.issue(
      {
        iss: '경력 증명서를 발급해주는 회사',
        iat: new Date().getTime(),
        vct: 'https://example.com', // 이 3개는 필수
        id: vc_id, // 이 아래 3개는 합의한대로
        issuer: issuer.id,
        subject: holder_did,
        ...claims,
      },
      disclosureFrame,
    );

    // 아래는 VP 까지 만드는

    const holder = this.getHolder();
    const holder_signer = await this.createSigner(holder.privateKey);

    const presenter_instance = new SDJwtVcInstance({
      kbSigner: holder_signer,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });
    const kbPayload = {
      //key binding payload
      //VP 에 추가되는 Payload
      iat: Math.floor(Date.now() / 1000), //VP 만든 시각
      aud: 'https://example.com', //이 VP를 만든 사람의 DID
      nonce: 'DiF0tB2VN-F73cnE3homjL2', // Verifier에게서 받은 일회용 난수를 암호화한 것- 그냥 아무렇게나 한거..
    };

    //SDJWTException: Key Binding Signer not found
    const vp = await presenter_instance.present(
      credential,
      {
        department: true,
        join: true,
      },
      {
        kb: { payload: kbPayload },
      },
    );
    console.log('\nvp\n');
    console.log(vp);

    // verify 까지 한다면
    const issuer_verifier = await this.createVerifier(issuer.publicKey);
    const holder_verifier = await this.createVerifier(holder.publicKey);

    const verifier_instance = new SDJwtVcInstance({
      verifier: issuer_verifier,
      signAlg: 'EdDSA',
      kbVerifier: holder_verifier,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    console.log('\nverify\n');
    console.log(await verifier_instance.verify(vp, ['department'], true));

    return credential;
  }
}
