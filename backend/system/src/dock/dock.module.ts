import { Module } from '@nestjs/common';
import { DockService } from './dock.service';
import { DockController } from './dock.controller';
import { DockUpdateService } from './dock.update.service';

@Module({
  providers: [DockService, DockUpdateService],
  controllers: [DockController],
})
export class DockModule {}
