import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GeneticTestIssuerTesterNonce {
  constructor(data?: Partial<GeneticTestIssuerTesterNonce>) {
    if (data) {
      this.did = data.did;
      this.nonce = data.nonce;
    }
  }
  did: string;
  nonce: number;
}

@Entity({ name: 'geneticTestIssuerTesterNonce' })
export class GeneticTestIssuerTesterNonceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  did: string;

  @Column()
  nonce: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
