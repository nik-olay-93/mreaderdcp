import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  password!: string;
}
