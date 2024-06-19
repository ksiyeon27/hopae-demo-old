import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { VerifierService } from './verifier.service';
import { RequestNonceFromVerifierDTO } from './dto/request-nonce-from-verifier';

@Controller('verifier')
export class VerifierController {
  constructor(readonly verifierService: VerifierService) {}

  // career
  @Post('/vp/career')
  async verifyCareerVp(
    @Body() careerVpVerifyData: VerifyCareerVpDTO,
  ): Promise<boolean> {
    return await this.verifierService.verifyCareerVp(careerVpVerifyData);
  }

  @Post('/nonce/career')
  requestNonceForCareer(
    @Body() requestNonceFromVerifierDTO: RequestNonceFromVerifierDTO,
  ): number {
    return this.verifierService.requestNonceForCareer(
      requestNonceFromVerifierDTO.holderDid,
    );
  }

  // genetic-test
  @Post('/vp/genetic-test')
  async verifyGeneticTestVp(
    @Body() careerVpVerifyData: VerifyCareerVpDTO,
  ): Promise<boolean> {
    return await this.verifierService.verifyCareerVp(careerVpVerifyData);
  }

  @Post('/nonce/genetic-test')
  requestNonceForGeneticTest(
    @Body() requestNonceFromVerifierDTO: RequestNonceFromVerifierDTO,
  ): number {
    return this.verifierService.requestNonceForGeneticTest(
      requestNonceFromVerifierDTO.holderDid,
    );
  }
}
