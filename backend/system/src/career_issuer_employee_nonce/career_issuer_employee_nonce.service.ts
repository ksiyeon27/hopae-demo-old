import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerIssuerEmployeeNonce,
  CareerIssuerEmployeeNonceEntity,
} from 'src/entities/career_issuer_employee_nonce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerIssuerEmployeeNonceService {
  constructor(
    @InjectRepository(CareerIssuerEmployeeNonceEntity)
    private readonly careerIssuerEmployeeNonceRepository: Repository<CareerIssuerEmployeeNonceEntity>,
  ) {}

  async create(
    did: string,
    nonce: number,
  ): Promise<CareerIssuerEmployeeNonceEntity> {
    const careerIssuerEmployeeNonce =
      this.careerIssuerEmployeeNonceRepository.create({
        did,
        nonce,
      });

    return await this.careerIssuerEmployeeNonceRepository.save(
      careerIssuerEmployeeNonce,
    );
  }
  async findOneByDid(did: string): Promise<CareerIssuerEmployeeNonce> {
    const entity = await this.careerIssuerEmployeeNonceRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new CareerIssuerEmployeeNonce({
      did: entity.did,
      nonce: entity.nonce,
    });
  }
}
