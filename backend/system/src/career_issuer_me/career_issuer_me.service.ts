import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CareerIssuerMe,
  CareerIssuerMeEntity,
} from 'src/entities/career_issuer_me.entity';

@Injectable()
export class CareerIssuerMeService {
  constructor(
    @InjectRepository(CareerIssuerMeEntity)
    private readonly careerIssuerMeRepository: Repository<CareerIssuerMeEntity>,
  ) {}

  async createCareerIssuerMe(
    did: string,
    publicKey: string,
    privateKey: string,
    name: string,
  ): Promise<CareerIssuerMeEntity> {
    const careerIssuerMe = this.careerIssuerMeRepository.create({
      did,
      publicKey,
      privateKey,
      name,
    });

    return await this.careerIssuerMeRepository.save(careerIssuerMe);
  }

  async findMe(): Promise<CareerIssuerMe> {
    const entities = await this.careerIssuerMeRepository.find();
    if (entities.length === 0) {
      throw new Error('Entity not found');
    }
    const entity = entities[0];

    console.log(`entity: ${entity}`);

    console.log(`json_parse_publickey: ${JSON.parse(entity.publicKey)}`);

    return new CareerIssuerMe({
      did: entity.did,
      publicKey: JSON.parse(entity.publicKey),
      privateKey: JSON.parse(entity.privateKey),
      name: entity.name,
    });
  }
}
