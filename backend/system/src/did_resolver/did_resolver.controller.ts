import { Controller, Get, Query } from '@nestjs/common';
import { DidResolverService } from './did_resolver.service';

@Controller('did-resolver')
export class DidResolverController {
  constructor(private didResolverService: DidResolverService) {}

  @Get()
  async getDid(@Query('did') did: string | undefined) {
    if (!did) {
      return 'did를 넣어주세용';
    }
    const result = await this.didResolverService.getDidDoc(did);
    if (result === undefined) {
      return '해당 did에 대한 정보가 없습니다.';
    }
    return result;
  }

  @Get('public-key')
  async getPulicKey(@Query('did') did: string | undefined) {
    if (!did) {
      return 'did를 넣어주세용';
    }
    const result = await this.didResolverService.getPublicKeyByDid(did);
    if (result === undefined) {
      return '해당 did에 대한 정보가 없어 퍼블릭키를 가져올 수 없습니다.';
    }
    return result;
  }
}
