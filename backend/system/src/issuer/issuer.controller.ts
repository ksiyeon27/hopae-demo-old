import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
import { PlayersDidData } from './dto/players-did-data.dto';
import { RequestNonceForCareerDTO } from './dto/request-nonce-for-career.dto';
import { EmployeeData } from './dto/employee-data.dto';
@Controller('issuer')
export class IssuerController {
  constructor(readonly issuerService: IssuerService) {}

  @Post('/players/career')
  async makePlayers(@Body() playersDidData: PlayersDidData) {
    await this.issuerService.makePlayers(playersDidData);
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
    @Body() requestNonceForCareerDTO: RequestNonceForCareerDTO,
  ): number {
    return this.issuerService.requestNonceForCareer(
      requestNonceForCareerDTO.holderDid,
    );
  }
}
