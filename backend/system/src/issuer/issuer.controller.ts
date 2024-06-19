import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestVcDTO } from './dto/request-career-vc.dto';
import { PlayersDidData } from './dto/players-did-data.dto';
import { RequestNonceFromIssuerDTO } from './dto/request-nonce-for-career.dto';
import { EmployeeData } from './dto/employee-data.dto';
import { GeneticTestResultData } from './dto/genetic-test-result-data.dto';
@Controller('issuer')
export class IssuerController {
  constructor(readonly issuerService: IssuerService) {}

  //career

  @Post('/players/career')
  async makePlayers(@Body() playersDidData: PlayersDidData) {
    await this.issuerService.makeIssuer(playersDidData.issuerDid, 'career');
    await this.issuerService.makeHolder(playersDidData.holderDid);
  }

  @Post('/employee/career')
  async makeEmployee(@Body() employeeData: EmployeeData) {
    await this.issuerService.makeEmployee(employeeData);
  }

  @Post('/nonce/career')
  requestNonceForCareer(
    @Body() requestNonceFromIssuerDTO: RequestNonceFromIssuerDTO,
  ): number {
    return this.issuerService.requestNonceForCareer(
      requestNonceFromIssuerDTO.holderDid,
    );
  }

  @Post('/vc/career')
  async requestCareerVc(@Body() vcRequestData: RequestVcDTO): Promise<string> {
    return await this.issuerService.requestCareerVc(vcRequestData);
  }

  @Get('/vc/career/:id')
  async findCareerVc(@Param('id') vcDid: string): Promise<boolean> {
    return this.issuerService.findCareerVc(vcDid);
  }

  // genetic-test

  @Post('/me/genetic-test/:issuerDid')
  async makeGeneticTestIssuerMe(@Param('issuerDid') issuerDid: string) {
    await this.issuerService.makeIssuer(issuerDid, 'genetic-test');
  }

  @Post('/result/genetic-test')
  async makeGeneticTestResult(
    @Body() geneticTestResultData: GeneticTestResultData,
  ) {
    await this.issuerService.makeGeneticTestResult(geneticTestResultData);
  }

  @Post('/nonce/genetic-test')
  requestNonceForGeneticTest(
    @Body() requestNonceFromIssuerDTO: RequestNonceFromIssuerDTO,
  ): number {
    return this.issuerService.requestNonceForGeneticTest(
      requestNonceFromIssuerDTO.holderDid,
    );
  }

  @Post('/vc/genetic-test')
  async requestGeneticTestVc(
    @Body() vcRequestData: RequestVcDTO,
  ): Promise<string> {
    return await this.issuerService.requestGeneticTestVc(vcRequestData);
  }

  @Get('/vc/genetic-test/:id')
  async findGeneticTestVc(@Param('id') vcDid: string): Promise<boolean> {
    return this.issuerService.findCareerVc(vcDid);
  }
}
