import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  // TypeORM 会自动在多的那一方添加外键,不需要通过 @JoinColumn 指定，
  @ManyToOne(() => Department, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  department: Department;
}
