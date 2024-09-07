import connect from "@/config/db";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await connect();
        const users = await User.find();
        return NextResponse.json({ result: users });
    } catch (error: any) {
        return NextResponse.json({ result: error.message }, { status: 500 });
    }
}