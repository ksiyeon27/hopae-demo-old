import { Controller, Post } from '@nestjs/common';
import { CareerIssuerMeService } from 'src/career_issuer_me/career_issuer_me.service';
import { DockService } from 'src/dock/dock.service';
import { DockDidUtilService } from 'src/dock/util_service/util.service';
import { JwtService } from 'src/jwt/jwt.service';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}
  @Post('all')
  // issuer1, issuer2, hodlder 이렇게 3개 플레이어를 init한다.
  // 원래 인자 받아서 할까 했는데, 이게 고정이라니깐 이렇게 하자.
  async initAll() {
    const issuer1Did = await this.initService.initIssuer({
      issuerName: 'issuer1',
    });
    const issuer2Did = await this.initService.initIssuer({
      issuerName: 'issuer2',
    });
    const holderDid = await this.initService.initHolder();
    return {
      issuer1: {
        did: issuer1Did,
      },
      issuer2: {
        did: issuer2Did,
      },
      holder: {
        did: holderDid,
      },
    };
  }
}
