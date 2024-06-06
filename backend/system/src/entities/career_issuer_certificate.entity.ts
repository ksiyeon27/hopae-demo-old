import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CareerIssuerCertificate {
  constructor(data?: Partial<CareerIssuerCertificate>) {
    if (data) {
      this.vc_did = data.vc_did;
      this.createdAt = data.createdAt;
    }
  }
  vc_did: string;
  createdAt: Date;
}

@Entity({ name: 'careerIssuerCertificateEntity' })
export class CareerIssuerCertificateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vc_did: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
