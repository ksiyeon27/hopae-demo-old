import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';
import { CareerIssuerMeModule } from 'src/career_issuer_me/career_issuer_me.module';
import { TestHolderModule } from 'src/test_holder/test_holder.module';

@Module({
  imports: [DidResolverModule, CareerIssuerMeModule, TestHolderModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
