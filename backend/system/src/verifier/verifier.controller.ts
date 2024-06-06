import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { VerifierService } from './verifier.service';
import { RequestNonceFromVerifierDTO } from './dto/request-nonce-from-verifier';

@Controller('verifier')
export class VerifierController {
  constructor(readonly verifierService: VerifierService) {}

  @Post('/vp/career')
  async verifyCareerVp(
    @Body() careerVpVerifyData: VerifyCareerVpDTO,
  ): Promise<boolean> {
    return await this.verifierService.verifyCareerVp(careerVpVerifyData);
  }

  @Post('/nonce/career')
  requestNonceFromVerifier(
    @Body() requestNonceFromVerifierDTO: RequestNonceFromVerifierDTO,
  ): number {
    return this.verifierService.requestNonceFromVerifier(
      requestNonceFromVerifierDTO.holderDid,
    );
  }
}
