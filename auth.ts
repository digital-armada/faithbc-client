import { StrapiErrorT } from "@/types/strapi/StrapiError";
import { StrapiLoginResponseT } from "@/types/strapi/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // make sure the are credentials
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null;
        }
        try {
          const strapiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
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

          // console.log(strapiResponse);
          /*
          console.log(strapiResponse);

            Response {
                type: 'basic',
                url: 'http://127.0.0.1:1337/api/auth/local',
                redirected: false,
                status: 200,
                ok: true,
                statusText: 'OK',
                headers: Headers {
            ...

          ok is a boolean value
          using the ! operator is checking if the response is false
          */

          if (!strapiResponse.ok) {
            // If the it's false, we want to check if an error message was sent back via JSON format and handle it. If not, then have a generic fallback
            const contentType = strapiResponse.headers.get("content-type");

            console.log(contentType);
            if (contentType === "application/json; charset=utf-8") {
              const data: StrapiErrorT = await strapiResponse.json();
              /**
               console.log(data);
              {
                data: null,
                error: {
                  status: 400,
                  name: 'ValidationError',
                  message: 'Invalid identifier or password',
                  details: {}
                }
              }
              */
              throw new Error(data.error.message);
            } else {
              throw new Error(strapiResponse.statusText);
              // statusText: 'Bad Request', - from the header
            }
          }

          // success
          const data: StrapiLoginResponseT = await strapiResponse.json();

          /**
           data:
                {
                  jwt:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIsImlhdCI6MTcyMzY0ODU2MywiZXhwIjoxNzI2MjQwNTYzfQ.DpuhS7XEmpGH6FRFMsMPpeXc6_4m-NoYGNIE7i4O18s',
                  user: {
                    id: 62,
                    ... }
           */

          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
          };
        } catch (error) {
          // console.log("strapi", error.message);
          // throw new Error(error.response.data.message);
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('singIn callback', { account, profile, user });
      if (
        account &&
        account.provider === "google" &&
        profile &&
        "email_verified" in profile
      ) {
        if (!profile.email_verified) return true;
      }
      return true;
    },

    async jwt({ token, trigger, account, user, session }) {
      // console.log('jwt callback', {
      //   token,
      //   trigger,
      //   account,
      //   user,
      //   session,
      // });

      // change username update
      if (trigger === "update" && session?.username) {
        token.name = session.username;
      }

      // change password update
      if (trigger === "update" && session?.strapiToken) {
        token.strapiToken = session.strapiToken;
      }

      if (account) {
        if (account.provider === "google") {
          // we now know we are doing a sign in using GoogleProvider
          try {
            const strapiResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: "no-cache" },
            );
            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json();
              // console.log('strapiError', strapiError);
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse: StrapiLoginResponseT =
              await strapiResponse.json();
            // customize token
            // name and email will already be on here
            token.strapiToken = strapiLoginResponse.jwt;
            token.strapiUserId = strapiLoginResponse.user.id;
            token.provider = account.provider;
            token.blocked = strapiLoginResponse.user.blocked;
          } catch (error) {
            throw error;
          }
        }
        if (account.provider === "credentials") {
          console.log("hit");
          // for credentials, not google provider
          // name and email are taken care of by next-auth or authorize
          token.strapiToken = user.strapiToken;
          token.strapiUserId = user.strapiUserId;
          token.provider = account.provider;
          token.blocked = user.blocked;
        }
      }
      console.log(token, trigger, account, user, session);
      return token;
    },
    async session({ token, session }) {
      // console.log('session callback', {
      //   token,
      //   session,
      // });

      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;
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

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }
// }
//
// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//   }
// }
