import connect from "@/config/db";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        await connect();
        const users = await User.find();
        return NextResponse.json({ result: users });
    } catch (error: any) {
        return NextResponse.json({ result: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {

    try {
        const reqBody = await req.json();
        await connect();

        const newUser = new User(reqBody);
        await newUser.save();

        return NextResponse.json({ message: `${newUser.username} is created successfully` });
    } catch (error: any) {
        return NextResponse.json({ message: `Error occured while saving the user ${error.message}` },
            { status: 500 }
        );
    }

}