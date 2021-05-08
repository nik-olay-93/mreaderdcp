import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./Book";
import { Rate } from "./Rate";

@ObjectType()
@Entity()
export class Account extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.creator)
  books: Book[];

  @OneToMany(() => Rate, (rate) => rate.creator)
  ratings: Rate[];

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  udpatedAt: Date;
}
