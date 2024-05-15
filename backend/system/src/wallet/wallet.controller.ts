import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(readonly walletService: WalletService) {}

  @Post('/vp/career')
  async verifyCareerVp(
    @Body() careerVpVerifyData: VerifyCareerVpDTO,
  ): Promise<boolean> {
    return await this.walletService.verifyCareerVp(careerVpVerifyData);
  }
}
