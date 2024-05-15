import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';

@Module({
  imports: [JwtModule, DidResolverModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
