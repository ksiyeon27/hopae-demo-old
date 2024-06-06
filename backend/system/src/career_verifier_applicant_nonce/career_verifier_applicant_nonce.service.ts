import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CareerVerifierApplicantNonce,
  CareerVerifierApplicantNonceEntity,
} from 'src/entities/career_verifier_applicant_nonce.enity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerVerifierApplicantNonceService {
  constructor(
    @InjectRepository(CareerVerifierApplicantNonceEntity)
    private readonly careerVerifierApplicantNonceRepository: Repository<CareerVerifierApplicantNonceEntity>,
  ) {}

  async create(
    did: string,
    nonce: number,
  ): Promise<CareerVerifierApplicantNonceEntity> {
    const careerVerifierApplicantNonceEntity =
      this.careerVerifierApplicantNonceRepository.create({
        did,
        nonce,
      });

    return await this.careerVerifierApplicantNonceRepository.save(
      careerVerifierApplicantNonceEntity,
    );
  }
  async findOneByDid(did: string): Promise<CareerVerifierApplicantNonce> {
    const entity = await this.careerVerifierApplicantNonceRepository.findOne({
      where: { did },
      order: { createdAt: 'DESC' }, // 최신순으로 정렬
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return new CareerVerifierApplicantNonce({
      did: entity.did,
      nonce: entity.nonce,
    });
  }
}
