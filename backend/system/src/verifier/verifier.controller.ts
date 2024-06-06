import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { VerifierService } from './verifier.service';

@Controller('verifier')
export class VerifierController {
  constructor(readonly verifierService: VerifierService) {}

  @Post('/vp/career')
  async verifyCareerVp(
    @Body() careerVpVerifyData: VerifyCareerVpDTO,
  ): Promise<boolean> {
    return await this.verifierService.verifyCareerVp(careerVpVerifyData);
  }
}
