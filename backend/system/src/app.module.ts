import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuerModule } from './issuer/issuer.module';
import { WalletModule } from './wallet/wallet.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [IssuerModule, WalletModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
