import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import axiosInstance from "./services/api";
import { UserWithToken } from "./types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const baseURL = ((process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_DOCKER) || "http://locahost:4000")
                    const response = await axiosInstance.post(`${baseURL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const userData = response.data;
                    // Type assertion for modifying user
                    const typedUser = userData as UserWithToken;

                    // Update user with data from your backend
                    typedUser._id = userData.user._id;
                    typedUser.email = userData.user.email;
                    typedUser.role = userData.user.role;
                    typedUser.access_token = userData.access_token;

                    return typedUser;
                } catch {
                    return null;
                }
            },
        }),

    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            const typedUser = user as UserWithToken | undefined;

            if (typedUser) {
                token._id = typedUser._id;
                token.email = typedUser.email;
                token.role = typedUser.role;
                token.token = typedUser.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string | undefined;
                session.token = token.token as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
})