import { RequestVcDTO } from './dto/request-career-vc.dto';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import {
  CancerClaims,
  CareerVcClaims,
  GeneticTestVcClaims,
} from './dto/claims.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { DidResolverService } from 'src/did_resolver/did_resolver.service';
import { CareerIssuerEmployeeService } from 'src/career_issuer_employee/career_issuer_employee.service';
import { CareerIssuerEmployee } from 'src/entities/career_issuer_employee.entity';
import { CareerIssuerEmployeeNonceService } from 'src/career_issuer_employee_nonce/career_issuer_employee_nonce.service';
import { CareerIssuerCertificateService } from 'src/career_issuer_certificate/career_issuer_certificate.service';
import { EmployeeData } from './dto/employee-data.dto';
import { GeneticTestIssuerTesterNonceService } from 'src/genetic_test_issuer_tester_nonce/genetic_test_issuer_tester_nonce.service';
import { GeneticTestResultData } from './dto/genetic-test-result-data.dto';
import { GeneticTestIssuerResultService } from 'src/genetic_test_issuer_result/genetic_test_issuer_result.service';
import { GeneticTestIssuerResult } from 'src/entities/genetic_test_issuer_result.entity';
import { GeneticTestIssuerCertificateService } from 'src/genetic_test_issuer_certificate/genetic_test_issuer_certificate.service';

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
    readonly geneticTestIssuerCertificateService: GeneticTestIssuerCertificateService,
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

  async findGeneticTestVc(vcDid: string): Promise<boolean> {
    console.log(`==issuerService: findCareerVc ${vcDid} ==`);
    const certificate =
      await this.geneticTestIssuerCertificateService.findOneByVcDid(vcDid);

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

  async requestCareerVc(careerVcRequestData: RequestVcDTO): Promise<string> {
    console.log('==issuerService: requestCareerVc==');

    // 1. 홀더 검증 : DID resolver API 호출해서 did docs 얻어오고, 난수 복호화 시도
    const publicKey = await this.didResolverService.getPublicKeyByDid(
      careerVcRequestData.holderDid,
    );
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
    const vcClaims = this._createCareerVcClaims(employee);

    const newVcId = 'new_vc_id';
    const newVc = this.jwtService.createCareerVcJwt(
      vcClaims,
      newVcId,
      careerVcRequestData.holderDid,
    );

    // 3. VC 를 issuer DB 에 저장
    this.careerIssuerCertificateService.create(newVcId);

    return newVc;
  }

  _createCareerVcClaims(employee: CareerIssuerEmployee): CareerVcClaims {
    const claims = new CareerVcClaims({
      department: employee.department,
      position: employee.position,
      join: employee.join.toLocaleDateString(),
      leave: employee.leave.toLocaleDateString(),
    });

    return claims;
  }

  async requestGeneticTestVc(vcRequestData: RequestVcDTO): Promise<string> {
    console.log('==issuerService: requestGeneticTestVc==');

    // 1. 홀더 검증 : DID resolver API 호출해서 did docs 얻어오고, 난수 복호화 시도
    const publicKey = await this.didResolverService.getPublicKeyByDid(
      vcRequestData.holderDid,
    );
    const tester_nonce_entity =
      await this.geneticTestIssuerTesterNonceService.findOneByDid(
        vcRequestData.holderDid,
      );
    const encryptedNonce = vcRequestData.encryptedNonce;

    const verifyResult = this.jwtService._verifyNonceUsingPublicKey(
      publicKey,
      tester_nonce_entity.nonce,
      encryptedNonce,
    );
    if (!verifyResult) {
      throw new HttpException('pulic key를 통한 난수 verify에 실패함', 400);
    }

    // issuer DB 에서 genetic_test 가져오기
    const genetic_test_result =
      await this.geneticTestIssuerResultService.findOneByDid(
        vcRequestData.holderDid,
      );
    if (!genetic_test_result) {
      throw new NotFoundException(
        '해당하는 holder의 유전자 검사 결과 정보를 찾을 수 없습니다.',
      );
    }

    // 2. VC 생성
    const vcClaims = this._createGeneticTestVcClaims(genetic_test_result);

    const newVcId = 'new_vc_id';
    const newVc = this.jwtService.createGeneticTestVcJwt(
      vcClaims,
      newVcId,
      vcRequestData.holderDid,
    );

    // 3. VC 를 issuer DB 에 저장
    this.geneticTestIssuerCertificateService.create(newVcId);

    return newVc;
  }

  _createGeneticTestVcClaims(
    genetic_test_result: GeneticTestIssuerResult,
  ): GeneticTestVcClaims {
    const claims = new GeneticTestVcClaims({
      hair_loss_gene_heritability: genetic_test_result.hairLossGeneHeritability,
      dermatitis_gene_heritability:
        genetic_test_result.dermatitisGeneHeritability,
      cancer_risk: new CancerClaims({
        liver: genetic_test_result.liverCancerRisk,
        lungs: genetic_test_result.lungsCancerRisk,
        pancreas: genetic_test_result.pancreasCancerRisk,
        stomach: genetic_test_result.stomachCancerRisk,
      }),
    });

    return claims;
  }
}
