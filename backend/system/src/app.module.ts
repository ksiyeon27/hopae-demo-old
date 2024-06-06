import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuerModule } from './issuer/issuer.module';
import { RegistryModule } from './registry/registry.module';
import { RegistryController } from './registry/registry.controller';
import { RegistryService } from './registry/registry.service';
import { DockModule } from './dock/dock.module';

@Module({
  imports: [IssuerModule, RegistryModule, DockModule],
  controllers: [AppController, RegistryController],
  providers: [AppService, RegistryService],
})
export class AppModule {}
