import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GeneticTestVerifierMemberNonce,
  GeneticTestVerifierMemberNonceEntity,
} from 'src/entities/genetic_test_verifier_member_nonce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneticTestVerifierMemberNonceService {
  constructor(
    @InjectRepository(GeneticTestVerifierMemberNonceEntity)
    private readonly geneticTestVerifierMemberNonceRepository: Repository<GeneticTestVerifierMemberNonceEntity>,
  ) {}

  async create(
    did: string,
    nonce: number,
  ): Promise<GeneticTestVerifierMemberNonceEntity> {
    const geneticTestVerifierMemberNonceEntity =
      this.geneticTestVerifierMemberNonceRepository.create({
        did,
        nonce,
      });

    return await this.geneticTestVerifierMemberNonceRepository.save(
      geneticTestVerifierMemberNonceEntity,
    );
  }
  async findOneByDid(did: string): Promise<GeneticTestVerifierMemberNonce> {
    const entity = await this.geneticTestVerifierMemberNonceRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new GeneticTestVerifierMemberNonce({
      did: entity.did,
      nonce: entity.nonce,
    });
  }
}
