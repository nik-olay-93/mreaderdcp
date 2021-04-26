import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class InputError {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}
