import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  // 4 - Technician
  @Column('int', {
    default: 4,
  })
  level: number;

  @OneToMany(() => Account, (account) => account.role)
  account: Account;
}
