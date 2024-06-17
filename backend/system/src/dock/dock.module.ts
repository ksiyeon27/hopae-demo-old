import { Module } from '@nestjs/common';
import { DockService } from './dock.service';
import { DockController } from './dock.controller';
import { DockUpdateService } from './dock.update.service';
import { UtilService } from './util_service/util.service';

@Module({
  providers: [DockService, DockUpdateService, UtilService],
  controllers: [DockController],
})
export class DockModule {}
