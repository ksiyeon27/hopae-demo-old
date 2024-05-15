import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { DidResolverModule } from 'src/did_resolver/did_resolver.module';

@Module({
  imports: [DidResolverModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
