import { StrapiErrorT } from "@/types/strapi/StrapiError";
import { StrapiLoginResponseT } from "@/types/strapi/User";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { User } from "./types/types";

export const BASE_PATH = "/api/auth";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "email and password",
      credentials: {
        identifier: {
          label: "Email or username *",
          type: "text",
        },
        password: { label: "Password *", type: "password" },
      },
      async authorize(credentials, req) {
        // make sure there are credentials
        if (!credentials || !credentials.identifier || !credentials.password) {
          console.log("no credentials");
          return null;
        }
        try {
          const strapiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                identifier: credentials!.identifier,
                password: credentials!.password,
              }),
            },
          );

          if (!strapiResponse.ok) {
            // return error to signIn callback
            const contentType = strapiResponse.headers.get("content-type");
            if (contentType === "application/json; charset=utf-8") {
              const data = await strapiResponse.json();
              throw new Error(data.error.message);
            } else {
              throw new Error(strapiResponse.statusText);
            }
          }

          // success
          const data = await strapiResponse.json();

          // Fetch user role
          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=role`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
              },
            },
          );

          const userData = await userResponse.json();
          console.log(userData);
          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
            confirmed: data.user.confirmed,
            role: userData.role.name, // Add user's role here
          };
        } catch (error) {
          // Catch errors in try but also f.e. connection fails
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.confirmed) {
        // Redirect to an email confirmation page
        return "/confirmation/newrequest";
      }

      return true;
    },

    async jwt({ token, trigger, account, user, session }) {
      // change username update
      if (trigger === "update" && session?.username) {
        token.name = session.username;
      }

      // change password update
      if (trigger === "update" && session?.strapiToken) {
        token.strapiToken = session.strapiToken;
      }
      if (account) {
        if (account.provider === "credentials") {
          // for credentials, not google provider
          // name and email are taken care of by next-auth or authorize
          token.strapiToken = user.strapiToken;
          token.strapiUserId = user.strapiUserId;
          token.provider = account.provider;
          token.blocked = user.blocked;
          token.confirmed = user.confirmed;
          token.role = user.role;
        }
      }
      // console.log(token, trigger, account, user, session);
      return token;
    },
    async session({ token, session }) {
      // console.log("token", token);
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;
      session.user.confirmed = token.confirmed;
      session.user.role = token.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  basePath: BASE_PATH,

  pages: {
    signIn: "/signin",
    error: "/authError",
  },
});
