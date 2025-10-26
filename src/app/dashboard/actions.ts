'use server'

import { PrismaClient } from "@/generated/prisma";
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function getPages(){
    const session = await getServerSession(authOptions);
    if(!session?.user?.email) return [];

    return await prisma.page.findMany({
        where: {user: {email: session.user?.email}},
        orderBy: {updatedAt: 'desc'}
    })
}

export async function createPage(title: string){
    const session = await getServerSession(authOptions);
    if(!session?.user?.email) throw new Error('Not authenticated');

    const user = await prisma.user.findUnique({where: {email: session.user.email}});
    if(!user) throw new Error('user not found')

    const page = await prisma.page.create({
        data: {title, userId:user.id}
    })
    return page
}