import { Body, Controller, Post } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(readonly walletService: WalletService) {}

  @Post('/vp/career')
  async verify_career_vp(
    @Body() career_vp_verify_data: VerifyCareerVpDTO,
  ): Promise<boolean> {
    return await this.walletService.verify_career_vp(career_vp_verify_data);
  }
}
