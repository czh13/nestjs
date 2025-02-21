import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 20 })
  name: string;
  @CreateDateColumn()
  creatTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
}
