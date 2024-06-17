import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
import { PlayersDidData } from './dto/players-did-data.dto';
import { RequestNonceFromIssuerDTO } from './dto/request-nonce-for-career.dto';
import { EmployeeData } from './dto/employee-data.dto';
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
  @Get('/vc/career/:id')
  async findCareerVc(@Param('id') vcDid: string): Promise<boolean> {
    return this.issuerService.findCareerVc(vcDid);
  }

  @Post('/vc/career')
  async requestCareerVc(
    @Body() careerVcRequestData: RequestCareerVcDTO,
  ): Promise<string> {
    return await this.issuerService.requestCareerVc(careerVcRequestData);
  }

  @Post('/nonce/career')
  requestNonceForCareer(
    @Body() requestNonceFromIssuerDTO: RequestNonceFromIssuerDTO,
  ): number {
    return this.issuerService.requestNonceForCareer(
      requestNonceFromIssuerDTO.holderDid,
    );
  }

  // genetic-test

  @Post('/me/genetic-test/:issuerDid')
  async makeGeneticTestIssuerMe(@Param('issuerDid') issuerDid: string) {
    await this.issuerService.makeIssuer(issuerDid, 'genetic-test');
  }

  @Post('/result/genetic-test')
  async makeGeneticTestResult(@Body() employeeData: EmployeeData) {
    await this.issuerService.makeEmployee(employeeData);
  }
  @Get('/vc/genetic-test/:id')
  async findGeneticTestVc(@Param('id') vcDid: string): Promise<boolean> {
    return this.issuerService.findCareerVc(vcDid);
  }

  @Post('/vc/genetic-test')
  async requestGeneticTestVc(
    @Body() careerVcRequestData: RequestCareerVcDTO,
  ): Promise<string> {
    return await this.issuerService.requestCareerVc(careerVcRequestData);
  }

  @Post('/nonce/genetic-test')
  requestNonceForGeneticTest(
    @Body() requestNonceFromIssuerDTO: RequestNonceFromIssuerDTO,
  ): number {
    return this.issuerService.requestNonceForCareer(
      requestNonceFromIssuerDTO.holderDid,
    );
  }
}
