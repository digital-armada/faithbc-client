// https://next-auth.js.org/getting-started/typescript
// not sure about any of this but it throws no TS errors (anymore)

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { StrapiUserT } from "./strapi/StrapiLogin";

declare module "next-auth" {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context

  interface Session {
    strapiToken?: string;
    provider?: "google" | "credentials";
    user: User;
    confirmed?: boolean;
    role?: string;
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultSession["user"] {
    // not setting this will throw ts error in authorize function
    strapiUserId?: number;
    strapiToken?: string;
    blocked?: boolean;
    confirmed?: boolean;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  // Returned by the `jwt` callback and `getToken`, when using JWT sessions
  interface JWT {
    strapiUserId?: number;
    blocked?: boolean;
    strapiToken?: string;
    provider?: "credentials" | "google";
    confirmed?: boolean;
    role?: string;
  }
}

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  dateOfBirth: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    pCode: string;
  };
  commgroups: number;
}
