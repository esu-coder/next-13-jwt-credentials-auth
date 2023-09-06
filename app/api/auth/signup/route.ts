import { connectToMongoDB } from "@/app/lib/mongodb";
import { generateAuthToken, setAuthCookies } from "@/app/lib/server-helpers";
import User from "@/app/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        connectToMongoDB().catch(err => NextResponse.json(err))

        const userExists = await User.findOne({ email })

        if (userExists)
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 })

        const newUser = await User.create({
            name,
            email,
            password
        })

        const authToken = generateAuthToken(newUser._id)
        setAuthCookies(authToken)

        return NextResponse.json({
            success: true,
            msg: "USer logged in successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                _id: newUser._id
            }
        }, { status: 201 })
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            for (let field in error.errors) {
                const msg = error.errors[field].message
                return NextResponse.json({ success: false, error: msg })
            }
        }

        return NextResponse.json({ success: false, error })
    }
}