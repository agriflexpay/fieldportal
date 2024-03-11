import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCredentials } from "../../../lib/authApiRoutes";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
const options = {
    providers:[
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "admin@demo.com", },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const response = await verifyCredentials(credentials)
                    .then((response) => {
                        return response;
                    })
                    .catch((error) => {
                        throw new Error(error);
                    });

                if (response && response.authToken) {
                    // Redirect to the dashboard after successful authentication
                    return {
                        id: response.user.id,
                        user: response.user,
                        authToken: response.authToken,
                        refreshToken: response.refreshToken,
                    };
                } else {
                    return null;
                }
            },
        })
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.email = user.email;
                token.name = `${user.fname} ${user.lname}`;
                token.authToken = user.authToken;
                token.refreshToken = user.refreshToken;
                token.user_uuid = user.id;
                token.user = user;
            }
            return token;
        },
        async session({ token, session }) {
            if (token) {
                session.user = token.user;
                session.user_uuid = token.user_uuid;
                session.user.email = token.email;
                session.authToken = token.authToken;
                session.refreshToken = token.refreshToken;
            }
            return session;
        },
        // redirect: async ({ url, baseUrl }) => {
        //     console.log(url);
        //     if (url) {
        //       // When signing in, redirect to '/home'
        //       return `${baseUrl}`
        //     }
        //     // If not signing in, or if the URL is not '/api/auth/signin', return the original URL
        //     return url;
        //   },
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
