import { Module } from '@nestjs/common';
import { DidResolverService } from './did_resolver.service';

@Module({
  providers: [DidResolverService],
  exports: [DidResolverService],
})
export class DidResolverModule {}
