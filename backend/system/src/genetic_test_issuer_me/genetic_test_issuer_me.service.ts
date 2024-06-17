import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GeneticTestIssuerMe,
  GeneticTestIssuerMeEntity,
} from 'src/entities/genetic_test_issuer_me.entity';

@Injectable()
export class GeneticTestIssuerMeService {
  constructor(
    @InjectRepository(GeneticTestIssuerMeEntity)
    private readonly geneticTestIssuerMeRepository: Repository<GeneticTestIssuerMeEntity>,
  ) {}

  async create(
    did: string,
    publicKey: string,
    privateKey: string,
    name: string,
  ): Promise<GeneticTestIssuerMeEntity> {
    const geneticTestIssuerMe = this.geneticTestIssuerMeRepository.create({
      did,
      publicKey,
      privateKey,
      name,
    });

    return await this.geneticTestIssuerMeRepository.save(geneticTestIssuerMe);
  }

  async findMe(): Promise<GeneticTestIssuerMe> {
    const entities = await this.geneticTestIssuerMeRepository.find();
    if (entities.length === 0) {
      throw new Error('Entity not found');
    }
    const entity = entities[0];

    return new GeneticTestIssuerMe({
      did: entity.did,
      publicKey: JSON.parse(entity.publicKey),
      privateKey: JSON.parse(entity.privateKey),
      name: entity.name,
    });
  }
}
