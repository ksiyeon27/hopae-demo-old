import { HttpException, Injectable } from '@nestjs/common';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { CareerVcClaims, GeneticTestVcClaims } from 'src/issuer/dto/claims.dto';
import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import type { DisclosureFrame } from '@sd-jwt/types';
import * as crypto from 'crypto';
import { DidResolverService } from 'src/did_resolver/did_resolver.service';
import { CareerIssuerMeService } from 'src/career_issuer_me/career_issuer_me.service';
import { CareerIssuerMe } from 'src/entities/career_issuer_me.entity';
import { TestHolderService } from 'src/test_holder/test_holder.service';
import { TestHolder } from 'src/entities/test_holder.entity';
import { CareerVerifierApplicantNonceService } from 'src/career_verifier_applicant_nonce/career_verifier_applicant_nonce.service';
import { GeneticTestIssuerMeService } from 'src/genetic_test_issuer_me/genetic_test_issuer_me.service';
import { GeneticTestIssuerMe } from 'src/entities/genetic_test_issuer_me.entity';
import { GeneticTestVerifierMemberNonceService } from 'src/genetic_test_verifier_member_nonce/genetic_test_verifier_member_nonce.service';

@Injectable()
export class JwtService {
  constructor(
    readonly didResolverService: DidResolverService,
    readonly careerIssuerMeService: CareerIssuerMeService,
    readonly geneticTestIssuerMeService: GeneticTestIssuerMeService,
    readonly testHolderService: TestHolderService,
    readonly careerVerifierApplicantNonceService: CareerVerifierApplicantNonceService,
    readonly geneticTestVerifierMemberNonceService: GeneticTestVerifierMemberNonceService,
  ) {}

  async createPlayer(playerId: string, type: string) {
    const { privateKey, publicKey } = await ES256.generateKeyPair();

    if (type === 'holder') {
      // test_holder entity 생성
      const publicKeyString = JSON.stringify(publicKey);
      const privateKeyString = JSON.stringify(privateKey);

      this.testHolderService.create(
        playerId,
        publicKeyString,
        privateKeyString,
      );
    } else if (type === 'issuer') {
      // career_issuer_me entity 생성
      const publicKeyString = JSON.stringify(publicKey);
      const privateKeyString = JSON.stringify(privateKey);

      this.careerIssuerMeService.create(
        playerId,
        publicKeyString,
        privateKeyString,
        'career_issuer',
      );
    }
  }

  async createHolder(holderDid: string) {
    const { privateKey, publicKey } = await ES256.generateKeyPair();
    // test_holder entity 생성
    const publicKeyString = JSON.stringify(publicKey);
    const privateKeyString = JSON.stringify(privateKey);

    this.testHolderService.create(holderDid, publicKeyString, privateKeyString);
    this.getHolderByDid(holderDid);
  }

  async createIssuer(issuerDid: string, type: string) {
    const { privateKey, publicKey } = await ES256.generateKeyPair();
    // {type}_issuer_me entity 생성
    const publicKeyString = JSON.stringify(publicKey);
    const privateKeyString = JSON.stringify(privateKey);
    if (type === 'career') {
      this.careerIssuerMeService.create(
        issuerDid,
        publicKeyString,
        privateKeyString,
        'career_issuer',
      );
      await this.getCareerIssuer();
    } else if (type === 'genetic-test') {
      this.geneticTestIssuerMeService.create(
        issuerDid,
        publicKeyString,
        privateKeyString,
        'dtc_genetic_test_agency',
      );
      await this.getGeneticTestIssuer();
    }
  }

  async generateJwkPair() {
    return await ES256.generateKeyPair();
  }

  async getCareerIssuer(): Promise<CareerIssuerMe> {
    return await this.careerIssuerMeService.findMe();
  }

  async getGeneticTestIssuer(): Promise<GeneticTestIssuerMe> {
    return await this.geneticTestIssuerMeService.findMe();
  }

  async getHolderByDid(did: string): Promise<TestHolder> {
    return await this.testHolderService.findOneByDid(did);
  }

  async createSigner(privateKey: crypto.webcrypto.JsonWebKey) {
    return await ES256.getSigner(privateKey);
  }

  async createVerifier(publicKey: crypto.webcrypto.JsonWebKey) {
    return await ES256.getVerifier(publicKey);
  }

  async createCareerVcJwt(
    claims: CareerVcClaims,
    vcId: string,
    holderDid: string,
  ): Promise<string> {
    console.log('==jwtService: createCareerVcJwt==');
    const issuer = await this.getCareerIssuer();

    // console.log(issuer);
    const issuerSigner = await this.createSigner(issuer.privateKey);
    console.log(issuerSigner);

    const issuerInstance = new SDJwtVcInstance({
      signer: issuerSigner,
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
    const credential = await issuerInstance.issue(
      {
        iss: '경력 증명서를 발급해주는 회사', //회사 이름
        iat: new Date().getTime(),
        vct: '경력 증명서', //페이로드 스키마의 식별자
        id: vcId, // 이 아래 3개는 합의한대로
        issuer: issuer.did,
        subject: holderDid,
        ...claims,
      },
      disclosureFrame,
    );

    // 아래는 VP 까지 만드는

    const nonce = ''; // verifier 에게 받은 Nonce 입력
    const holder = await this.getHolderByDid(holderDid);
    const holderSigner = await this.createSigner(holder.privateKey);

    const presenterInstance = new SDJwtVcInstance({
      kbSigner: holderSigner,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });
    const kbPayload = {
      //key binding payload
      //VP 에 추가되는 Payload
      iat: new Date().getTime(), //VP 만든 시각
      aud: 'https://example.com', //이 VP를 받는 사람 식별자라고 함
      nonce: await holderSigner(nonce), // 암호화한 난수
    };

    //SDJWTException: Key Binding Signer not found
    const vp = await presenterInstance.present(
      credential,
      {
        department: true,
        position: true,
        join: true,
        leave: false,
      },
      {
        kb: { payload: kbPayload },
      },
    );
    console.log('\nvp\n');
    console.log(vp);

    //verify 까지
    const issuerVerifier = await this.createVerifier(issuer.publicKey);
    const holderVerifier = await this.createVerifier(holder.publicKey);

    const verifierInstance = new SDJwtVcInstance({
      verifier: issuerVerifier,
      signAlg: 'EdDSA',
      kbVerifier: holderVerifier,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    // console.log('\nverify\n');
    const verified = await verifierInstance.verify(vp, ['department'], true);
    // console.log(verified);

    return credential;
  }

  async verifyCareerVpJwt(holderDid: string, vp: string) {
    console.log('==jwtService: verifyCareerVpJwt==');
    //1. did 리졸버로 holder public key 얻어오기
    const holderPublicKey =
      await this.didResolverService.getPublicKeyByDid(holderDid);
    console.log(` 1) did 리졸버로 holderPublicKey 얻기 : ${holderPublicKey}`);

    //2. decode 해서 payload 에서 필요한 데이터들 얻어오기
    const vpToken = await this._decodeVpJwt(vp);
    // console.log(vpToken);
    // const vct = vpToken.jwt.payload.vct; // 이게 scheme('경력증명서')
    // console.log(vct); // iss(회사이름), iat(시간)) 도 필수였음
    const issuerDid = vpToken.jwt.payload.issuer.toString(); // issuerDid
    console.log(issuerDid);
    const encryptedNonce = vpToken.kbJwt.payload.nonce;
    console.log(encryptedNonce);
    console.log(
      ` 2) vp decode 해서 데이터 얻어오기 : ${issuerDid}, ${encryptedNonce}`,
    );

    //3. did리졸버로 issuer public key 얻어오기
    const issuerPublicKey =
      await this.didResolverService.getPublicKeyByDid(issuerDid);
    console.log(` 3) did 리졸버로 issuerPublicKey 얻기 : ${issuerPublicKey}`);

    console.log(`issuerPublicKey: ${issuerPublicKey}`);
    console.log(`holderPublicKey: ${holderPublicKey}`);

    //4. 난수 복호화 테스트
    const applicant_nonce_entity =
      await this.careerVerifierApplicantNonceService.findOneByDid(holderDid);

    const verifyResult = this._verifyNonceUsingPublicKey(
      holderPublicKey,
      applicant_nonce_entity.nonce,
      encryptedNonce,
    );
    if (!verifyResult) {
      throw new HttpException('pulic key를 통한 난수 verify에 실패함', 400);
    }
    console.log(
      ` 4) 난수 복호화 테스트 : ${verifyResult} - ${encryptedNonce}, ${applicant_nonce_entity.nonce}`,
    );
    console.log('왜 프린트');

    //5. instance.verify() 하기
    // 테스트용

    console.log(
      ` 5. instance.verify() 시작: issuer ${issuerDid}, holder ${holderDid} 이용`,
    );
    const issuerVerifier = await this.createVerifier(issuerPublicKey);
    const holderVerifier = await this.createVerifier(holderPublicKey);

    const verifierInstance = new SDJwtVcInstance({
      verifier: issuerVerifier,
      signAlg: 'EdDSA',
      kbVerifier: holderVerifier,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    // console.log('\nverify\n');
    const verified = await verifierInstance.verify(vp, ['department'], true);
    console.log(` 5) SDJwtVcInstance.verify()`);
    return verified;
  }

  async createGeneticTestVcJwt(
    claims: GeneticTestVcClaims,
    vcId: string,
    holderDid: string,
  ): Promise<string> {
    console.log('==jwtService: createGeneticTestVcJwt==');
    const issuer = await this.getGeneticTestIssuer();

    // console.log(issuer);
    const issuerSigner = await this.createSigner(issuer.privateKey);
    console.log(issuerSigner);

    const issuerInstance = new SDJwtVcInstance({
      signer: issuerSigner,
      signAlg: 'EdDSA', //ES256?
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    // Issuer Define the disclosure frame to specify which claims can be disclosed
    // 일단 4개 항목 다 sd 로 넣음
    const disclosureFrame: DisclosureFrame<typeof claims> = {
      _sd: ['hair_loss_gene_heritability'],
    };

    // Issue a signed JWT credential with the specified claims and disclosures
    // Return a Encoded SD JWT. Issuer send the credential to the holder
    const credential = await issuerInstance.issue(
      {
        iss: '유전자 검사 기관 A',
        iat: new Date().getTime(),
        vct: 'DTC 유전자 검사 결과', //페이로드 스키마의 식별자
        id: vcId, // 이 아래 3개는 합의한대로
        issuer: issuer.did,
        subject: holderDid,
        ...claims,
      },
      disclosureFrame,
    );

    // 아래는 VP 까지 만드는
    const nonce = ''; // verifier 에게 받은 Nonce 입력
    const holder = await this.getHolderByDid(holderDid);
    const holderSigner = await this.createSigner(holder.privateKey);

    const presenterInstance = new SDJwtVcInstance({
      kbSigner: holderSigner,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });
    const kbPayload = {
      //key binding payload
      //VP 에 추가되는 Payload
      iat: new Date().getTime(), //VP 만든 시각
      aud: 'https://example.com', //이 VP를 받는 사람 식별자라고 함
      nonce: await holderSigner(nonce), // 암호화한 난수 - /verifier/nonce/genetic-test 응답 + Mock
    };

    //SDJWTException: Key Binding Signer not found
    const vp = await presenterInstance.present(
      credential,
      {
        hair_loss_gene_heritability: true,
        dermatitis_gene_heritability: true,
        cancer_risk: true,
      },
      {
        kb: { payload: kbPayload },
      },
    );
    console.log('\nvp\n');
    console.log(vp);

    //verify 까지
    const issuerVerifier = await this.createVerifier(issuer.publicKey);
    const holderVerifier = await this.createVerifier(holder.publicKey);

    const verifierInstance = new SDJwtVcInstance({
      verifier: issuerVerifier,
      signAlg: 'EdDSA',
      kbVerifier: holderVerifier,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    // console.log('\nverify\n');
    const verified = await verifierInstance.verify(
      vp,
      ['dermatitis_gene_heritability'],
      true,
    );
    // console.log(verified);

    return credential;
  }

  async verifyGeneticTestVpJwt(holderDid: string, vp: string) {
    console.log('==jwtService: verifyGeneticTestVpJwt==');
    //1. did 리졸버로 holder public key 얻어오기
    const holderPublicKey =
      await this.didResolverService.getPublicKeyByDid(holderDid);
    console.log(` 1) did 리졸버로 holderPublicKey 얻기 : ${holderPublicKey}`);

    //2. decode 해서 payload 에서 필요한 데이터들 얻어오기
    const vpToken = await this._decodeVpJwt(vp);
    // console.log(vpToken);
    // const vct = vpToken.jwt.payload.vct; // 이게 scheme('경력증명서')
    // console.log(vct); // iss(회사이름), iat(시간)) 도 필수였음
    const issuerDid = vpToken.jwt.payload.issuer.toString(); // issuerDid
    console.log(issuerDid);
    const encryptedNonce = vpToken.kbJwt.payload.nonce;
    console.log(encryptedNonce);
    console.log(
      ` 2) vp decode 해서 데이터 얻어오기 : ${issuerDid}, ${encryptedNonce}`,
    );

    //3. did리졸버로 issuer public key 얻어오기
    const issuerPublicKey =
      await this.didResolverService.getPublicKeyByDid(issuerDid);
    console.log(` 3) did 리졸버로 issuerPublicKey 얻기 : ${issuerPublicKey}`);

    const applicant_nonce_entity =
      await this.geneticTestVerifierMemberNonceService.findOneByDid(holderDid);

    const verifyResult = this._verifyNonceUsingPublicKey(
      holderPublicKey,
      applicant_nonce_entity.nonce,
      encryptedNonce,
    );
    if (!verifyResult) {
      throw new HttpException('pulic key를 통한 난수 verify에 실패함', 400);
    }
    console.log(
      ` 4) 난수 복호화 테스트 : ${verifyResult} - ${encryptedNonce}, ${applicant_nonce_entity.nonce}`,
    );

    //5. instance.verify() 하기
    // 테스트용
    console.log(
      ` 5. instance.verify() 시작: issuer ${issuerDid}, holder ${holderDid} 이용`,
    );
    const issuerVerifier = await this.createVerifier(issuerPublicKey);
    const holderVerifier = await this.createVerifier(holderPublicKey);

    const verifierInstance = new SDJwtVcInstance({
      verifier: issuerVerifier,
      signAlg: 'EdDSA',
      kbVerifier: holderVerifier,
      kbSignAlg: 'EdDSA',
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    // console.log('\nverify\n');
    const verified = await verifierInstance.verify(
      vp,
      ['dermatitis_gene_heritability'],
      true,
    );
    console.log(` 5) SDJwtVcInstance.verify()`);
    return verified;
  }

  async _decodeVpJwt(vp: string) {
    console.log('==jwtService: _decodeVpJwt==');
    const decoderInstance = new SDJwtVcInstance({
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
    });

    const sdJwtToken = await decoderInstance.decode(vp);
    return sdJwtToken;
  }

  // 이거 일단 임시로 추상화한다고 생각하고 이렇게 만들어놓겠음.
  // 임시로 만들어놓은 방식은 아래 참조
  // 바꿔야 함. 암호화와 같은 알고리즘으로 복호화했을 때 같은지 진짜 확인하기. publicKey 타입 바꾸기
  async _verifyNonceUsingPublicKey(
    publicKey: JsonWebKey,
    originalNonce: number,
    encryptedNonce: string,
  ): Promise<boolean> {
    const holderVerifier = await this.createVerifier(publicKey);
    return holderVerifier(originalNonce.toString(), encryptedNonce);
  }
}
