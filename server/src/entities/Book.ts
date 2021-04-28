import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => [String])
  @Column("text", { array: true })
  genres!: string[];

  @Field(() => String)
  @Column()
  artist!: string;

  @Field(() => Account)
  @ManyToOne(() => Account, (account) => account.books)
  creator!: Account;

  @Field(() => Int)
  @Column("int", { default: 0 })
  views!: number;

  @Field(() => Int)
  @Column()
  pages: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  udpatedAt: Date;
}
