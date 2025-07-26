import { DefaultSession } from 'next-auth';
import { UserType } from './user';

// Extend NextAuth types
declare module "next-auth" {
    interface User {
        _id: string;
        email: string;
        token?: string;
        role?: string;
    }

    interface Session {
        user: {
            _id: string;
            email: string;
            role?: string;
        } & DefaultSession["user"];
        token?: string;
    }
}

// JWT type extension
declare module "next-auth/jwt" {
    interface JWT {
        _id: string;
        email: string;
        role?: string; // Optional role field
    }
} 