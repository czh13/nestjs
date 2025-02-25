import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;
  @Column({ length: 50, nullable: true })
  desc: string;
  @CreateDateColumn()
  creatTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
}
