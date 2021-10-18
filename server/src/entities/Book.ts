import { MyContext } from "src/types";
import { Ctx, Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";
import { Rate } from "./Rate";

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

  @OneToMany(() => Rate, (rate) => rate.book)
  ratings: Rate[];

  @Field(() => Int)
  ratingsCount(): number {
    return this.ratings.length;
  }

  @Field(() => Int)
  ratingsSum() {
    return this.ratings.reduce((last, curr) => last + curr.score, 0);
  }

  @Field(() => Float, { nullable: true })
  async myRating(@Ctx() { req }: MyContext): Promise<number | undefined> {
    if (!req.session.userId) {
      return undefined;
    }

    const creator = await Account.findOne(req.session.userId, {
      relations: ["ratings", "ratings.book"],
    });

    if (!creator) {
      return undefined;
    }

    const rate = creator.ratings.find((val) => {
      return val.book.id === this.id;
    });

    return rate?.score;
  }

  @Field(() => Int)
  @Column()
  pages: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
