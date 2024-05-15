import { Module } from '@nestjs/common';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';

@Module({
  imports: [JwtModule, DidResolverModule],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}
