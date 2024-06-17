import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GeneticTestIssuerResult {
  constructor(data?: Partial<GeneticTestIssuerResult>) {
    Object.assign(this, data);
  }
  did: string; //검사자 did
  hairLossGeneHeritability: number; //탈모 유전자 유전율(0~100)
  dermatitisGeneHeritability: number; //피부염 유전자 유전율(0~100)
  stomachCancerRisk: number; //위암 위험도 (0~100)
  lungsCancerRisk: number; //폐암 위험도 (0~100)
  liverCancerRisk: number; //간암 위험도 (0~100)
  pancreasCancerRisk: number; //췌장암 위험도 (0~100)
}

@Entity({ name: 'geneticTestIssuerResult' })
export class GeneticTestIssuerResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  did: string;

  @Column()
  hairLossGeneHeritability: number;

  @Column()
  dermatitisGeneHeritability: number;

  @Column()
  stomachCancerRisk: number;

  @Column()
  lungsCancerRisk: number;

  @Column()
  liverCancerRisk: number;

  @Column()
  pancreasCancerRisk: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
