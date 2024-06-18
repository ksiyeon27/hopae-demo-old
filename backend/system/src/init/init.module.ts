import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import { CareerIssuerMeService } from 'src/career_issuer_me/career_issuer_me.service';
import { DockService } from 'src/dock/dock.service';
import { DockDidUtilService } from 'src/dock/util_service/util.service';
import { JwtService } from 'src/jwt/jwt.service';
import { TestHolderService } from 'src/test_holder/test_holder.service';
import { CareerIssuerMeModule } from 'src/career_issuer_me/career_issuer_me.module';
import { DockModule } from 'src/dock/dock.module';
import { TestHolderModule } from 'src/test_holder/test_holder.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [CareerIssuerMeModule, DockModule, TestHolderModule, JwtModule],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
