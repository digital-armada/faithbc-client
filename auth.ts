import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import axios from 'axios';
import type { NextAuthConfig } from 'next-auth';

export const config = {
    session: { strategy: 'jwt' },

    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
                        {
                            identifier: credentials.email,
                            password: credentials.password,
                        }
                    );

                    const { jwt, user } = response.data;

                    if (!jwt || !user) {
                        throw new Error('Missing JWT or user data');
                    }

                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        jwt,
                    };
                } catch (error) {
                    throw new Error(error.response.data.message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log('token', token);
            // console.log('user', user);
            if (user) {
                // Store the JWT and user id in the token object
                token.accessToken = user.jwt;
                token.id = user.id;
            }
            // console.log('token', token);
            return token;
        },
        async session({ session, token }) {
            // Store the accessToken from the token in the session
            session.accessToken = token.accessToken;
            // If user id exists, store it in the session
            if (token.id) {
                session.user = { ...session.user, id: token.id };
            }
            // console.log(session);
            return session;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
