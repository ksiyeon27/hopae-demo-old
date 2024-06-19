import { HttpException, Injectable } from '@nestjs/common';
import { VerifyVpDTO } from './dto/verify-career-vp.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { CareerVerifierApplicantNonceService } from 'src/career_verifier_applicant_nonce/career_verifier_applicant_nonce.service';
import { GeneticTestVerifierMemberNonceService } from 'src/genetic_test_verifier_member_nonce/genetic_test_verifier_member_nonce.service';

@Injectable()
export class VerifierService {
  constructor(
    readonly jwtService: JwtService,
    readonly careerVerifierApplicantNonceService: CareerVerifierApplicantNonceService,
    readonly geneticTestVerifierApplicantNonceService: GeneticTestVerifierMemberNonceService,
  ) {}

  requestNonceForCareer(holderDid: string): number {
    // 난수 발급하고 - 랜덤 정수 (0 이상 2^31-1 미만)
    const nonce = Math.floor(Math.random() * 2 ** 31 - 1);

    // career_verifier_applicant_nonce 테이블에 저장하기
    this.careerVerifierApplicantNonceService.create(holderDid, nonce);
    return nonce;
  }

  requestNonceForGeneticTest(holderDid: string): number {
    // 난수 발급하고 - 랜덤 정수 (0 이상 2^31-1 미만)
    const nonce = Math.floor(Math.random() * 2 ** 31 - 1);

    // genetic_test_verifier_member_nonce 테이블에 저장하기
    this.geneticTestVerifierApplicantNonceService.create(holderDid, nonce);
    return nonce;
  }

  async verifyCareerVp(vpVerifyData: VerifyVpDTO): Promise<boolean> {
    console.log('==VerifierService: verifyCareerVp==');

    // 1. VP 를 sd-jwt 로 verify (kbJwt 시그니처 검증+난수 검증으로 홀더 검증, jwt 시그니처 검증으로 이슈어 검증)
    let verified = null;
    try {
      verified = await this.jwtService.verifyCareerVpJwt(
        vpVerifyData.holderDid,
        vpVerifyData.vp,
      );
    } catch (SDJWTException) {
      throw new HttpException('sd-jwt verify 실패', 400);
    }
    console.log('!! 1번 검증 완료 (시그니처, 난수 검증)');

    // 2. VC 가 from issuer 가 맞는지 issuer API 호출해서 확인
    const payload: any = verified.payload;
    const vcId = payload.id.toString();
    console.log(vcId);
    const res = await fetch(`http://localhost:8000/issuer/vc/career/${vcId}`, {
      method: 'GET',
    });
    const find = await res.json();
    if (!find) {
      throw new HttpException('VC 가 issuer 의 DB 에서 조회되지 않음', 400);
    }
    console.log(`!! 2번 검증 완료 (issuer 디비에서 vcId 찾기 : ${vcId})`);

    return true;
  }

  async verifyGeneticTestVp(vpVerifyData: VerifyVpDTO): Promise<boolean> {
    console.log('==VerifierService: verifyGeneticTestVp==');

    // 1. VP 를 sd-jwt 로 verify (kbJwt 시그니처 검증+난수 검증으로 홀더 검증, jwt 시그니처 검증으로 이슈어 검증)
    let verified = null;
    try {
      verified = await this.jwtService.verifyGeneticTestVpJwt(
        vpVerifyData.holderDid,
        vpVerifyData.vp,
      );
    } catch (SDJWTException) {
      throw new HttpException('sd-jwt verify 실패', 400);
    }
    console.log('!! 1번 검증 완료 (시그니처, 난수 검증)');

    // 2. VC 가 from issuer 가 맞는지 issuer API 호출해서 확인
    const payload: any = verified.payload;
    const vcId = payload.id.toString();
    console.log(vcId);
    const res = await fetch(
      `http://localhost:8000/issuer/vc/genetic-test/${vcId}`,
      {
        method: 'GET',
      },
    );
    const find = await res.json();
    if (!find) {
      throw new HttpException('VC 가 issuer 의 DB 에서 조회되지 않음', 400);
    }
    console.log(`!! 2번 검증 완료 (issuer 디비에서 vcId 찾기 : ${vcId})`);

    return true;
  }
}
