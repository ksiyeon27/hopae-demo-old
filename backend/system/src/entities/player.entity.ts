import * as crypto from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Player {
  constructor(data?: Partial<Player>) {
    Object.assign(this, data);
  }
  id: string; //나의 did
  type: string;
  publicKey: crypto.webcrypto.JsonWebKey; //나의 publicKey
  privateKey: crypto.webcrypto.JsonWebKey; //나의 privateKey
}

@Entity({ name: 'player' })
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  publicKey: string;

  @Column()
  privateKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
