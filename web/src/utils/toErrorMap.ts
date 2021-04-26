import { InputError } from "../generated/graphql";

export const toErrorMap = (errors: InputError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
