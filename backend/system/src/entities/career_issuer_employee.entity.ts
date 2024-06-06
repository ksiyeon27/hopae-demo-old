import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CareerIssuerEmployee {
  constructor(data?: Partial<CareerIssuerEmployee>) {
    Object.assign(this, data);
  }
  did: string; //직원 did
  department: string; //부서
  position: string; //직급
  salary: number; //연봉
  join: Date; // 입사일
  leave: Date; //퇴사일
}

@Entity({ name: 'careerIssuerEmployee' })
export class CareerIssuerEmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  did: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column()
  salary: number;

  @Column()
  join: Date;

  @Column()
  leave: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
