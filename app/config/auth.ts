import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginByOTP, loginByPassword } from "@/app/modules/auth/_repository/auth";

interface CustomUser {
  id: number;
  name: string;
  family: string;
  mobile: string;
  token: string;
  avatar: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" },
        code: { label: "OTP", type: "text" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        let response;

        if (credentials?.password) {
          response = await loginByPassword({
            mobile: credentials.mobile,
            password: credentials.password,
          });
        } else if (credentials?.code) {
          response = await loginByOTP({
            mobile: credentials.mobile,
            code: credentials.code,
          });
        } else {
          return null;
        }

        const user = response.data.data;

        if (user) {
          return {
            id: user.id,
            name: user.name,
            family: user.family,
            mobile: user.mobile,
            token: user.token,
            avatar: user.avatar,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.name = user.name;
        token.family = user.family;
        token.avatar = user.avatar;
        token.mobile = user.mobile;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        name: token.name,
        family: token.family,
        avatar: token.avatar,
        mobile: token.mobile,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
