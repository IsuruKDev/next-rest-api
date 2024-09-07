import connect from "@/config/db";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

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

export async function PATCH(req: NextRequest) {

    try {

        const body = await req.json();
        const { userId, newUsername } = body
        await connect();

        if (!userId || !newUsername) {
            return NextResponse.json({ message: "Invalid Request" }, { status: 400 })
        }

        if (!ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid Data Type" }, { status: 400 })
        }

        const updateUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUsername },
            { new: true }
        )

        return updateUser ? NextResponse.json(
            { message: `${updateUser.username} is updated successfully.` }
        ) : NextResponse.json({ message: "Error occure while updating the record" }, { status: 500 })

    } catch (error: any) {
        return NextResponse.json({ message: `Error occured while updating the user ${error.message}` },
            { status: 500 }
        );
    }
}