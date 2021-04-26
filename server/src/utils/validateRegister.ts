import { InputError } from "./InputError";
import { RegisterInput } from "./RegisterInput";

export const validateRegister = (
  options: RegisterInput
): InputError[] | null => {
  if (options.username.length < 3) {
    return [
      {
        field: "username",
        message: "Length must be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username cannot contain @ symbol",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "username",
        message: "Invalid email",
      },
    ];
  }

  if (options.password.length < 3) {
    return [
      {
        field: "password",
        message: "Length must be greater than 2",
      },
    ];
  }

  return null;
};
