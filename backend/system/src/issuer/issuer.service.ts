import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { Claims } from './dto/claims.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { PlayersDidData } from './dto/players-did-data.dto';
import { DidResolverService } from 'src/did_resolver/did_resolver.service';
import { CareerIssuerEmployeeService } from 'src/career_issuer_employee/career_issuer_employee.service';
import { CareerIssuerEmployee } from 'src/entities/career_issuer_employee.entity';
import { CareerIssuerEmployeeNonceService } from 'src/career_issuer_employee_nonce/career_issuer_employee_nonce.service';
import { CareerIssuerCertificateService } from 'src/career_issuer_certificate/career_issuer_certificate.service';
import { EmployeeData } from './dto/employee-data.dto';
import { GeneticTestIssuerTesterNonceService } from 'src/genetic_test_issuer_tester_nonce/genetic_test_issuer_tester_nonce.service';
import { GeneticTestResultData } from './dto/genetic-test-result-data.dto';
import { GeneticTestIssuerResultService } from 'src/genetic_test_issuer_result/genetic_test_issuer_result.service';

@Injectable()
export class IssuerService {
  constructor(
    readonly jwtService: JwtService,
    readonly didResolverService: DidResolverService,
    readonly careerIssuerEmployeeService: CareerIssuerEmployeeService,
    readonly geneticTestIssuerResultService: GeneticTestIssuerResultService,
    readonly careerIssuerEmployeeNonceService: CareerIssuerEmployeeNonceService,
    readonly geneticTestIssuerTesterNonceService: GeneticTestIssuerTesterNonceService,
    readonly careerIssuerCertificateService: CareerIssuerCertificateService,
  ) {}

  async makeIssuer(issuerDid: string, type: string) {
    console.log(`==issuerService: makeIssuer ${issuerDid} for ${type}`);
    await this.jwtService.createIssuer(issuerDid, type);
  }

  async makeHolder(holderDid: string) {
    console.log(`==issuerService: makeHolder ${holderDid}`);
    await this.jwtService.createHolder(holderDid);
  }

  async makeEmployee(employeeData: EmployeeData) {
    console.log(`==issuerService: makeEmployee`);
    await this.careerIssuerEmployeeService.create(
      employeeData.did,
      employeeData.department,
      employeeData.position,
      employeeData.salary,
      new Date(employeeData.join),
      new Date(employeeData.leave),
    );
  }

  async makeGeneticTestResult(geneticTestResultData: GeneticTestResultData) {
    console.log(`==issuerService: makeGeneticTestResult`);
    await this.geneticTestIssuerResultService.create(
      geneticTestResultData.did,
      geneticTestResultData.hairLossGeneHeritability,
      geneticTestResultData.dermatitisGeneHeritability,
      geneticTestResultData.stomachCancerRisk,
      geneticTestResultData.lungsCancerRisk,
      geneticTestResultData.liverCancerRisk,
      geneticTestResultData.pancreasCancerRisk,
    );
  }

  async findCareerVc(vcDid: string): Promise<boolean> {
    console.log(`==issuerService: findCareerVc ${vcDid} ==`);
    const certificate =
      await this.careerIssuerCertificateService.findOneByVcDid(vcDid);

    if (!certificate) {
      return false;
    } else {
      return true;
    }
  }

  requestNonceForCareer(holderDid: string): number {
    console.log('==issuerService: requestNonceForCareer==');
    // 난수 발급하고 - 랜덤 정수 (0 이상 2^31-1 미만)
    const nonce = Math.floor(Math.random() * 2 ** 31 - 1);

    // career_issuer_employee_nonce 테이블에 저장하기
    this.careerIssuerEmployeeNonceService.create(holderDid, nonce);
    return nonce;
  }

  requestNonceForGeneticTest(holderDid: string): number {
    console.log('==issuerService: requestNonceForGeneticTest==');
    // 난수 발급하고 - 랜덤 정수 (0 이상 2^31-1 미만)
    const nonce = Math.floor(Math.random() * 2 ** 31 - 1);

    // genetic_test_issuer_tester_nonce 테이블에 저장하기
    this.geneticTestIssuerTesterNonceService.create(holderDid, nonce);
    return nonce;
  }

  async requestCareerVc(
    careerVcRequestData: RequestCareerVcDTO,
  ): Promise<string> {
    console.log('==issuerService: requestCareerVc==');

    // 1. 홀더 검증 : DID resolver API 호출해서 did docs 얻어오고, 난수 복호화 시도
    const didDoc = await this.didResolverService.getDidDoc(
      careerVcRequestData.holderDid,
    );

    // 실제로는 public key 담겨있는 공간이 약간 다른데 대충 일단은 여기 있다고 가정하자
    const publicKey = didDoc.publicKey ?? 'mock';
    const employee_nonce_entity =
      await this.careerIssuerEmployeeNonceService.findOneByDid(
        careerVcRequestData.holderDid,
      );
    const encryptedNonce = careerVcRequestData.encryptedNonce;

    const verifyResult = this.jwtService._verifyNonceUsingPublicKey(
      publicKey,
      employee_nonce_entity.nonce,
      encryptedNonce,
    );
    if (!verifyResult) {
      throw new HttpException('pulic key를 통한 난수 verify에 실패함', 400);
    }

    // issuer DB 에서 career 가져오기
    const employee = await this.careerIssuerEmployeeService.findOneByDid(
      careerVcRequestData.holderDid,
    );
    if (!employee) {
      throw new NotFoundException(
        '해당하는 holder의 커리어 정보를 찾을 수 없습니다.',
      ); //안에 message 가능
    }

    // 2. VC 생성
    const vcClaims = this._createVcClaims(employee);

    const newVcDid = 'new_vc_id'; // POST /did/{did}
    const newVc = this.jwtService.createVcJwt(
      vcClaims,
      newVcDid,
      careerVcRequestData.holderDid,
    );

    // 3. VC 를 issuer DB 에 저장하고, VC id 를 DID registry 에 등록함
    this.careerIssuerCertificateService.create(newVcDid);

    return newVc;
  }

  _createVcClaims(employee: CareerIssuerEmployee): Claims {
    //VC 생성 (추후 sd-jwt : issuer 의 pirvate_key 이용)
    // POST /did/{did}?
    const claims = new Claims({
      department: employee.department,
      position: employee.position,
      join: employee.join.toLocaleDateString(),
      leave: employee.leave.toLocaleDateString(),
    });

    return claims;
  }
}
