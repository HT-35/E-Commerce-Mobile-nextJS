"use server";

import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const login = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
      redirect: false,
    });

    return login;
  } catch (error) {
    if (error.name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if (error.name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return { error: "Internal Server Error hehe !!" };
    }
  }
}
