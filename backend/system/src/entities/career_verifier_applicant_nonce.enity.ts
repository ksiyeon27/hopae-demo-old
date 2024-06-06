import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CareerVerifierApplicantNonce {
  constructor(data?: Partial<CareerVerifierApplicantNonce>) {
    if (data) {
      this.did = data.did;
      this.nonce = data.nonce;
    }
  }
  did: string;
  nonce: number;
}

@Entity({ name: 'careerVerifierApplicantNonce' })
export class CareerVerifierApplicantNonceEntity {
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
