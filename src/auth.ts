import { authApi } from "@/ListApi/authApi";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "@/components/auth/serverComponentLogin/authErrors";
import { IUser } from "@/types/next-auth.d";
import { sendRequest } from "@/utils/api";

import NextAuth, { AuthError, User } from "next-auth";

import Credentials from "next-auth/providers/credentials";

/**
 * Hỗ Trợ Login, Login
 *
 * Lưu Token Vào Cookie
 *
 *
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //let user: User;

        // type IUser data User when SignIn
        const res = await sendRequest<IBackendRes<IUserRes>>({
          method: "POST",
          url: authApi.login(),
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        // login thành công
        if (+res?.statusCode === 201) {
          // next Auth bắt buộc phải trả về type User from nextJS

          return {
            id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,

            access_token: res.data?.access_token,
          };
          // Trả về đối tượng user với dữ liệu hồ sơ của họ
        } else if (+res?.statusCode === 401) {
          // Login sai email || password
          throw new InvalidEmailPasswordError();
        } else if (+res?.statusCode === 400) {
          // account chưa active
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal Server Error !!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },

  //config session
  callbacks: {
    // user này là từ Credentials return ra user nên , token.user =  user và user có type IUser.
    //vì ghi đè type của JWT của  next-auth/jwt   nên user có type IUser
    jwt({ token, user }) {
      if (user) {
        const customUser = user as IUser;
        token.access_token = customUser.access_token; // Truy cập đúng thuộc tính
        token.refresh_token = customUser.access_token;
        token.user = customUser;
        delete token.user.access_token;
      }

      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user; // token.user có type IUser
      session.access_token = token.access_token;
      session.refresh_token = token.access_token;
      return session;
    },
    //authorized: async ({ auth }) => {
    //  // Logged in users are authenticated, otherwise redirect to login page
    //  return !!auth;
    //},
  },
});
