import { Module } from '@nestjs/common';
import { VerifierController } from './verifier.controller';
import { VerifierService } from './verifier.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';

@Module({
  imports: [JwtModule, DidResolverModule],
  controllers: [VerifierController],
  providers: [VerifierService],
})
export class VerifierModule {}
