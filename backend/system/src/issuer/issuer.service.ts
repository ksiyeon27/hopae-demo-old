import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Career } from './entities/career.entity';
import { Claims } from './dto/claims.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { PlayersDidData } from 'src/dto/players-did-data.dto';
import { DidResolverService } from 'src/did_resolver/did_resolver.service';

@Injectable()
export class IssuerService {
  constructor(
    readonly jwtService: JwtService,
    readonly didResolverService: DidResolverService,
  ) {}

  private careers: Career[] = []; //DB table
  private certificates: string[] = []; //DB table

  async makePlayers(playersDidData: PlayersDidData) {
    console.log(
      `==issuerService: makePlayers ${playersDidData.holderDid}, ${playersDidData.issuerDid}`,
    );
    await this.jwtService.createPlayer(playersDidData.holderDid, 'holder');
    await this.jwtService.createPlayer(playersDidData.issuerDid, 'issuer');
    this.jwtService.getHolder();
    this.jwtService.getIssuer();
  }

  async start() {
    console.log('==issuerService: start (did1, did2)==');
    this.careers.push({
      id: 'did1',
      ...{
        department: '개발부서',
        position: '대리',
        salary: 50000,
        join: '20221222',
        leave: '20241222',
      },
    });

    this.careers.push({
      id: 'did2',
      ...{
        department: '마케팅부서',
        position: '팀장',
        salary: 70000,
        join: '20181222',
        leave: '20231222',
      },
    });
  }

  findCareerVc(vcId: string): boolean {
    console.log(`==issuerService: findCareerVc ${vcId} ==`);
    const certificate = this.certificates.find(
      (certificate) => certificate === vcId,
    );

    if (!certificate) {
      return false;
    } else {
      return true;
    }
  }

  async requestCareerVc(
    careerVcRequestData: RequestCareerVcDTO,
  ): Promise<string> {
    console.log('==issuerService: requestCareerVc==');
    // console.log('issuer');
    this.jwtService.getIssuer();
    // 1. 홀더 검증 : DID resolver API 호출해서 did docs 얻어오고, 난수 복호화 시도
    const didDoc = await this.didResolverService.getDidDoc(
      careerVcRequestData.holderDid,
    );

    // 실제로는 public key 담겨있는 공간이 약간 다른데 대충 일단은 여기 있다고 가정하자
    const publicKey = didDoc.publicKey ?? 'mock';
    const originalNonce = careerVcRequestData.orignalNonce;
    const encryptedNonce = careerVcRequestData.encryptedNonce;

    const verifyResult = this.jwtService._verifyNonceUsingPublicKey(
      publicKey,
      originalNonce,
      encryptedNonce,
    );
    if (!verifyResult) {
      throw new HttpException('pulic key를 통한 verify에 실패함', 400);
    }

    // issuer DB 에서 career 가져오기
    const career = this.careers.find(
      (career) => career.id === careerVcRequestData.holderDid,
    );
    if (!career) {
      throw new NotFoundException(
        '해당하는 holder의 커리어 정보를 찾을 수 없습니다.',
      ); //안에 message 가능
    }

    // 2. VC 생성
    const vcClaims = this._createVcClaims(career);

    const newVcDid = 'new_vc_id'; // POST /did/{did}
    const newVc = this.jwtService.createVcJwt(
      vcClaims,
      newVcDid,
      careerVcRequestData.holderDid,
    );

    // 3. VC 를 issuer DB 에 저장하고, VC id 를 DID registry 에 등록함
    this.certificates.push(newVcDid);

    return newVc;
  }

  _createVcClaims(career: Career): Claims {
    //VC 생성 (추후 sd-jwt : issuer 의 pirvate_key 이용)
    // POST /did/{did}?
    const claims = new Claims({
      department: career.department,
      position: career.position,
      join: career.join,
      leave: career.leave,
    });

    return claims;
  }
}
