import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GeneticTestIssuerCertificate {
  constructor(data?: Partial<GeneticTestIssuerCertificate>) {
    if (data) {
      this.vc_did = data.vc_did;
      this.createdAt = data.createdAt;
    }
  }
  vc_did: string;
  createdAt: Date;
}

@Entity({ name: 'geneticTestIssuerCertificateEntity' })
export class GeneticTestIssuerCertificateEntity {
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
