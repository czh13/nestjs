import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  // 不过一对多关系更多还是在一的那一方来保持关系
  @OneToMany(() => Employee, (employee) => employee.department, {
    cascade: true,
  })
  employees: Employee[];
}
