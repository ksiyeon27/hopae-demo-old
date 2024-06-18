import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GeneticTestIssuerTesterNonce,
  GeneticTestIssuerTesterNonceEntity,
} from 'src/entities/genetic_test_issuer_tester_nonce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneticTestIssuerTesterNonceService {
  constructor(
    @InjectRepository(GeneticTestIssuerTesterNonceEntity)
    private readonly geneticTestIssuerTesterNonceRepository: Repository<GeneticTestIssuerTesterNonceEntity>,
  ) {}

  async create(
    did: string,
    nonce: number,
  ): Promise<GeneticTestIssuerTesterNonceEntity> {
    const geneticTestIssuerTesterNonce =
      this.geneticTestIssuerTesterNonceRepository.create({
        did,
        nonce,
      });

    return await this.geneticTestIssuerTesterNonceRepository.save(
      geneticTestIssuerTesterNonce,
    );
  }
  async findOneByDid(did: string): Promise<GeneticTestIssuerTesterNonce> {
    const entity = await this.geneticTestIssuerTesterNonceRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new GeneticTestIssuerTesterNonce({
      did: entity.did,
      nonce: entity.nonce,
    });
  }
}
