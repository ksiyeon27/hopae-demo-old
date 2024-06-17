import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GeneticTestIssuerResult,
  GeneticTestIssuerResultEntity,
} from 'src/entities/genetic_test_issuer_result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneticTestIssuerResultService {
  constructor(
    @InjectRepository(GeneticTestIssuerResultEntity)
    private readonly geneticTestIssuerResultRepository: Repository<GeneticTestIssuerResultEntity>,
  ) {}
  async create(
    did: string,
    hairLossGeneHeritability: number,
    dermatitisGeneHeritability: number,
    stomachCancerRisk: number,
    lungsCancerRisk: number,
    liverCancerRisk: number,
    pancreasCancerRisk: number,
  ): Promise<GeneticTestIssuerResultEntity> {
    const geneticTestIssuerResult =
      this.geneticTestIssuerResultRepository.create({
        did,
        hairLossGeneHeritability,
        dermatitisGeneHeritability,
        stomachCancerRisk,
        lungsCancerRisk,
        liverCancerRisk,
        pancreasCancerRisk,
      });

    return await this.geneticTestIssuerResultRepository.save(
      geneticTestIssuerResult,
    );
  }

  async findOneByDid(did: string): Promise<GeneticTestIssuerResult> {
    const entity = await this.geneticTestIssuerResultRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new GeneticTestIssuerResult({
      did: entity.did,
      hairLossGeneHeritability: entity.hairLossGeneHeritability,
      dermatitisGeneHeritability: entity.dermatitisGeneHeritability,
      stomachCancerRisk: entity.stomachCancerRisk,
      lungsCancerRisk: entity.lungsCancerRisk,
      liverCancerRisk: entity.liverCancerRisk,
      pancreasCancerRisk: entity.pancreasCancerRisk,
    });
  }
}
