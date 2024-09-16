import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();
    this.type = message;
  }
}

/**
 *  Type =  Email hoặc Password sai rồi  !!
 */
export class InvalidEmailPasswordError extends AuthError {
  static type = "Email hoặc Password sai rồi  !!";
}

export class InactiveAccountError extends AuthError {
  static type =
    "Tài Khoản của m chưa được kích hoạt kìa, kích hoạt đi thằng ngu !!";
}
