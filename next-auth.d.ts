import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    family: string;
    mobile: string;
    token: string;
    avatar: string;
  }

  interface Session {
    user: {
      id: number;
      name: string;
      family: string;
      mobile: string;
      avatar: string;
    };
    accessToken: string;
  }
}
