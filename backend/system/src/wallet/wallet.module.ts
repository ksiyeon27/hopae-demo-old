import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
