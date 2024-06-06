import { Module } from '@nestjs/common';
import { TestHolderService } from './test_holder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestHolderEntity } from 'src/entities/test_holder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestHolderEntity])],
  providers: [TestHolderService],
  exports: [TestHolderService],
})
export class TestHolderModule {}
