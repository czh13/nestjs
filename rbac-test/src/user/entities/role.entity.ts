import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 20 })
  name: string;
  @CreateDateColumn()
  creatTime: Date;
  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'role_permission_relation' })
  permissions: Permission[];
}
