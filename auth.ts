import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";
export const { handlers, signIn, signOut, auth } = NextAuth({
  /**
  The authorize function in the Credentials provider is called first when a user attempts to sign in. This function is responsible for validating the user's credentials against your Strapi backend and returning a user object if the authentication is successful.
  If the authorize function returns a user object, NextAuth.js considers the authentication successful and proceeds to create a session.
   */
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
      async authorize(credentials) {
        // make sure there are credentials
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          const strapiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
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
            `${process.env.NEXT_PUBLIC_API_URL}/users/me?populate=role`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${data.jwt}`,
              },
            },
          );

          const userData = await userResponse.json();

          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
            confirmed: data.user.confirmed,
            role: userData.role.name, // Add user's role here
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          };
        } catch (error) {
          // Catch errors in try but also f.e. connection fails
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    //After successful authentication, the signIn callback is triggered. This callback allows you to control what happens immediately after a successful sign-in attempt.
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
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
      }
      // console.log(token, trigger, account, user, session);
      return token;
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;
      session.user.confirmed = token.confirmed;
      session.user.role = token.role;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
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
