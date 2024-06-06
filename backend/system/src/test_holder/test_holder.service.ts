import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestHolder, TestHolderEntity } from 'src/entities/test_holder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestHolderService {
  constructor(
    @InjectRepository(TestHolderEntity)
    private readonly testHolderRepository: Repository<TestHolderEntity>,
  ) {}

  async create(
    did: string,
    publicKey: string,
    privateKey: string,
  ): Promise<TestHolderEntity> {
    const testHolder = this.testHolderRepository.create({
      did,
      publicKey,
      privateKey,
    });

    return await this.testHolderRepository.save(testHolder);
  }

  async findOneByDid(did: string): Promise<TestHolder> {
    const entity = await this.testHolderRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new TestHolder({
      did: entity.did,
      publicKey: JSON.parse(entity.publicKey),
      privateKey: JSON.parse(entity.privateKey),
    });
  }
}
