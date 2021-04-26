import argon2 from "argon2";
import { Account } from "../entities/Account";
import { MyContext } from "../types";
import { LoginInput } from "../utils/LoginInput";
import { validateRegister } from "../utils/validateRegister";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { RegisterInput } from "../utils/RegisterInput";
import { UserResponse } from "../utils/UserResponse";
import { COOKIE_NAME } from "../constants";

@Resolver()
export class AccountResolver {
  @Query(() => Account, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<Account | undefined> {
    const id = req.session.userId;
    if (!id) {
      return undefined;
    }
    const user = await Account.findOne(id);
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => RegisterInput) options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = Account.create({
      email: options.email,
      password: hashedPassword,
      username: options.username,
    });

    try {
      await user.save();
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "That username already exists",
            },
          ],
        };
      } else {
        console.log(err);
      }
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => LoginInput) options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (!options.email && !options.username) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Cannot be empty",
          },
        ],
      };
    }

    if (!options.password) {
      return {
        errors: [
          {
            field: "password",
            message: "Cannot be empty",
          },
        ],
      };
    }

    const user = await Account.findOne(
      options.email ? { email: options.email } : { username: options.username }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That user doesnt exist",
          },
        ],
      };
    }

    const isValid = await argon2.verify(user.password, options.password);
    if (!isValid) {
      return {
        errors: [
          {
            field: "password",
            message: "Wrong password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}
