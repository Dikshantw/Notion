import { PrismaClient } from "@/generated/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request){
    const {email, password, name} = await req.json();
    if(!email || !password){
        return NextResponse.json({error: 'Email and Password are required'}, {status: 400})
    }

    const existing = await prisma.user.findUnique({
        where: {email}
    })
    if(existing){
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    const hashedPassword = await hash(password,10)
    const user = await prisma.user.create({
        data:{email,name,password:hashedPassword}
    })
    return NextResponse.json({id: user.id, email:user.email})
}