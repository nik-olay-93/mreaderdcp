import { Account } from "../entities/Account";
import { Field, ObjectType } from "type-graphql";
import { InputError } from "./InputError";

@ObjectType()
export class UserResponse {
  @Field(() => Account, { nullable: true })
  user?: Account;

  @Field(() => [InputError], { nullable: true })
  errors?: InputError[];
}
