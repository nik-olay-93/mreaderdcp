import { BookInput } from "../resolvers/book";
import { InputError } from "./InputError";

export const checkBookOption = (options: BookInput): InputError | undefined => {
  if (options.name.length < 4) {
    return {
      field: "name",
      message: "must be greater than 3",
    };
  }

  if (options.genres.length === 0) {
    return {
      field: "genres",
      message: "at least 1",
    };
  }

  if (options.artist === "") {
    return {
      field: "artist",
      message: "cannot be empty",
    };
  }

  return undefined;
};
