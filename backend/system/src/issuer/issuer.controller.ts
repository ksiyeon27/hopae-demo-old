import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
@Controller('issuer')
export class IssuerController {
  constructor(readonly issuerService: IssuerService) {}

  @Get('/vc/career/:id')
  async validate_career_vc(@Param('id') vc_id: string): Promise<boolean> {
    await this.issuerService.start();
    return this.issuerService.validate_career_vc(vc_id);
  }

  @Post('/vc/career')
  async request_career_vc(
    @Body() career_vc_request_data: RequestCareerVcDTO,
  ): Promise<string> {
    await this.issuerService.start();
    return await this.issuerService.request_career_vc(career_vc_request_data);
  }
}
