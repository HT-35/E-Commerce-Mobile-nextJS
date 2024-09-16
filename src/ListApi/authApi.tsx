import { register } from "module";

/**
 *     login:    /api/v1/auth/login
 *
 *    register: /api/v1/auth/register`,
 */
export const authApi = {
  login: () => `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/login`,
  register: () => `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/register`,

  active: () => `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/active`,

  getOptEmail: (email: string) =>
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/mail/${email}`,

  resetPassword: () =>
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/reset-password`,

  getNewPassword: () =>
    `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/get-new-pasword`,
};
