import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import fs from "fs";
import path from "path";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Book } from "../entities/Book";
import { InputError } from "../utils/InputError";
import { MyContext } from "../types";
import { Account } from "../entities/Account";

@ObjectType()
class BookResponse {
  @Field(() => [InputError], { nullable: true })
  errors?: InputError[];

  @Field(() => Book, { nullable: true })
  book?: Book;
}

@InputType()
class BookInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [String])
  genres!: string[];

  @Field(() => String)
  artist!: string;
}

@Resolver()
export class BookResolver {
  @Mutation(() => BookResponse)
  async createBook(
    @Ctx() { req }: MyContext,
    @Arg("options", () => BookInput) options: BookInput,
    @Arg("files", () => [GraphQLUpload]) files: Promise<FileUpload>[]
  ): Promise<BookResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "username",
            message: "not authenticated",
          },
        ],
      };
    }

    const crId = req.session.userId;
    const creator = await Account.findOne(crId, { relations: ["books"] });
    if (!creator) {
      return {
        errors: [
          {
            field: "user",
            message: "wrong user",
          },
        ],
      };
    }

    const book = Book.create(options);

    book.creator = creator;

    let pc = 0;
    for (let file of files) {
      const { mimetype, createReadStream } = await file;
      if (!mimetype.includes("image")) {
        return {
          errors: [
            {
              field: "files",
              message: "not an image",
            },
          ],
        };
      }
      let pdir = path.join(
        "C:/projects/mreaderdcp/server",
        "books",
        options.name
      );
      fs.mkdir(pdir, { recursive: true }, (err) => {
        if (err) console.log(err);
      });
      pdir = path.join(pdir, pc.toString());
      const wrStream = fs.createWriteStream(pdir);
      createReadStream().pipe(wrStream, { end: true });
      pc += 1;
    }

    book.pages = pc;
    if (!creator.books) {
      creator.books = [];
    }
    creator.books.push(book);
    try {
      await book.save();
      await creator.save();
    } catch (err) {
      console.log(err);
    }

    return { book };
  }

  @Query(() => [Book])
  async books(
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset?: number
  ): Promise<Book[]> {
    limit = Math.min(50, limit);
    let books;
    try {
      books = Book.find({
        order: {
          createdAt: "DESC",
        },
        skip: offset,
        take: limit,
      });
    } catch (err) {
      console.log(err);
      return [];
    }

    return books;
  }

  @Query(() => Book, { nullable: true })
  async book(@Arg("id", () => Int) bId: number): Promise<Book | undefined> {
    return await Book.findOne(bId, { relations: ["creator"] });
  }
}