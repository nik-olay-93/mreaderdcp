import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Account";
import { Book } from "./Book";

@Entity()
export class Rate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score!: number;

  @ManyToOne(() => Account, (account) => account.ratings)
  creator!: Account;

  @ManyToOne(() => Book, (book) => book.ratings)
  book!: Book;
}
