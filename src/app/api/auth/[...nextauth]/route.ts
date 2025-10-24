import { PrismaClient } from "@/generated/prisma";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider ({
            name: "Credentials",
            credentials: {
                email: {label:"Email", type:"text"},
                password: {label:"Password", type:"password"}
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Missing Email or Password")
                }

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                })

                if(!user) throw new Error("No user found")
                
                const isValid = await compare(credentials.password, user.password)
                if(!isValid) throw new Error("Invalid Credentials")
                
                return {id: user.id, email:user.email, name:user.name}
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}