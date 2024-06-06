import { HttpException, Injectable } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { DidResolverService } from 'src/did_resolver/did_resolver.service';

@Injectable()
export class VerifierService {
  constructor(
    readonly jwtService: JwtService,
    readonly didResolverService: DidResolverService,
  ) {}

  async verifyCareerVp(
    careerVpVerifyData: VerifyCareerVpDTO,
  ): Promise<boolean> {
    console.log('==VerifierService: verifyCareerVp==');

    // 1. VP 를 sd-jwt 로 verify (kbJwt 시그니처 검증+난수 검증으로 홀더 검증, jwt 시그니처 검증으로 이슈어 검증)
    let verified = null;
    try {
      verified = await this.jwtService.verifyVpJwt(
        careerVpVerifyData.holderDid,
        careerVpVerifyData.vp,
      );
    } catch (SDJWTException) {
      throw new HttpException('sd-jwt verify 실패', 400);
    }
    console.log('1번 검증 완료 (시그니처, 난수 검증)');

    // 2. VC 가 from issuer 가 맞는지 issuer API 호출해서 확인
    const payload: any = verified.payload;
    const vcId = payload.id.toString();
    console.log(vcId);
    const res = await fetch(`http://localhost:3000/issuer/vc/career/${vcId}`, {
      method: 'GET',
    });
    const find = await res.json();
    if (!find) {
      throw new HttpException('VC 가 issuer 의 DB 에서 조회되지 않음', 400);
    }
    console.log(`2번 검증 완료 (issuer 디비에서 vcId 찾기 : ${vcId})`);

    // 3. Did resolver 로 vcId 찾아와서 만료되었는지 확인
    const vcDidDoc = await this.didResolverService.getDidDoc(vcId);
    console.log(`3번 검증 완료 (vcId 로 Did Resolver 가 찾기 : ${vcId})`);
    // 만료기간 확인하는 코드 추가 필요
    console.log(vcDidDoc);

    return true;
  }
}
