import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuerModule } from './issuer/issuer.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [IssuerModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
