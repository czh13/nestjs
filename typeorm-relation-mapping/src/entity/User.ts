import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { IdCard } from "./IdCard";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  // 通过user查找idcard
  @OneToOne(() => IdCard, (idcard) => idcard.user)
  idCard: IdCard;
}
