import { Module } from '@nestjs/common';
import { DockService } from './dock.service';
import { DockController } from './dock.controller';
import { DockUpdateService } from './dock.update.service';
import { DockDidUtilService } from './util_service/util.service';

@Module({
  providers: [DockService, DockUpdateService, DockDidUtilService],
  controllers: [DockController],
  exports: [DockService, DockDidUtilService],
})
export class DockModule {}
