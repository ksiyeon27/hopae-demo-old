import * as crypto from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TestHolder {
  constructor(data?: Partial<TestHolder>) {
    if (data) {
      this.did = data.did;
      this.publicKey = data.publicKey as crypto.webcrypto.JsonWebKey;
      this.privateKey = data.privateKey as crypto.webcrypto.JsonWebKey;
    }
  }
  did: string; //나의 did
  publicKey: crypto.webcrypto.JsonWebKey; //나의 publicKey
  privateKey: crypto.webcrypto.JsonWebKey; //나의 privateKey
}

@Entity({ name: 'testHolderEntity' })
export class TestHolderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  did: string;

  @Column()
  publicKey: string;

  @Column()
  privateKey: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
