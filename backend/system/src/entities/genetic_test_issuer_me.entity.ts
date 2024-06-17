import * as crypto from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GeneticTestIssuerMe {
  constructor(data?: Partial<GeneticTestIssuerMe>) {
    if (data) {
      this.did = data.did;
      this.publicKey = data.publicKey as crypto.webcrypto.JsonWebKey;
      this.privateKey = data.privateKey as crypto.webcrypto.JsonWebKey;
      this.name = data.name;
    }
  }
  did: string; //나의 did
  publicKey: crypto.webcrypto.JsonWebKey; //나의 publicKey
  privateKey: crypto.webcrypto.JsonWebKey; //나의 privateKey
  name: string; //유전자 검사 기관 이름
}

@Entity({ name: 'geneticTestIssuerMe' })
export class GeneticTestIssuerMeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  did: string;

  @Column()
  publicKey: string;

  @Column()
  privateKey: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
