import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerIssuerCertificate,
  CareerIssuerCertificateEntity,
} from 'src/entities/career_issuer_certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerIssuerCertificateService {
  constructor(
    @InjectRepository(CareerIssuerCertificateEntity)
    private readonly careerIssuerCertificateRepository: Repository<CareerIssuerCertificateEntity>,
  ) {}

  async create(vc_did: string): Promise<CareerIssuerCertificateEntity> {
    const certificate = this.careerIssuerCertificateRepository.create({
      vc_did,
    });

    return await this.careerIssuerCertificateRepository.save(certificate);
  }

  async findOneByVcDid(vc_did: string): Promise<CareerIssuerCertificate> {
    const entity = await this.careerIssuerCertificateRepository.findOne({
      where: { vc_did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new CareerIssuerCertificate({
      vc_did: entity.vc_did,
      createdAt: entity.createdAt,
    });
  }
}
