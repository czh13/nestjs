import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
