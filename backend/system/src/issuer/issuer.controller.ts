import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
import { PlayersDidData } from 'src/dto/players-did-data.dto';
@Controller('issuer')
export class IssuerController {
  constructor(readonly issuerService: IssuerService) {}

  @Post('players')
  async makePlayers(@Body() playersDidData: PlayersDidData) {
    await this.issuerService.makePlayers(playersDidData);
  }

  @Get('/vc/career/:id')
  async findCareerVc(@Param('id') vcId: string): Promise<boolean> {
    return this.issuerService.findCareerVc(vcId);
  }

  @Post('/vc/career')
  async requestCareerVc(
    @Body() careerVcRequestData: RequestCareerVcDTO,
  ): Promise<string> {
    await this.issuerService.start();
    return await this.issuerService.requestCareerVc(careerVcRequestData);
  }
}
