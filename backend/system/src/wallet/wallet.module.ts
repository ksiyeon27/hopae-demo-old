import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, JwtService],
})
export class WalletModule {}
