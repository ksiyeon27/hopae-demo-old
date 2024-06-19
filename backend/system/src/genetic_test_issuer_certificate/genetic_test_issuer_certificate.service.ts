import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  GeneticTestIssuerCertificate,
  GeneticTestIssuerCertificateEntity,
} from 'src/entities/genetic_test_issuer_certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneticTestIssuerCertificateService {
  constructor(
    @InjectRepository(GeneticTestIssuerCertificateEntity)
    private readonly geneticTestIssuerCertificateRepository: Repository<GeneticTestIssuerCertificateEntity>,
  ) {}

  async create(vc_did: string): Promise<GeneticTestIssuerCertificateEntity> {
    const certificate = this.geneticTestIssuerCertificateRepository.create({
      vc_did,
    });

    return await this.geneticTestIssuerCertificateRepository.save(certificate);
  }

  async findOneByVcDid(vc_did: string): Promise<GeneticTestIssuerCertificate> {
    const entity = await this.geneticTestIssuerCertificateRepository.findOne({
      where: { vc_did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new GeneticTestIssuerCertificate({
      vc_did: entity.vc_did,
      createdAt: entity.createdAt,
    });
  }
}
