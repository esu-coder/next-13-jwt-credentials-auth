import { connectToMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs"
import { generateAuthToken, setAuthCookies } from "@/app/lib/server-helpers";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        if (!email)
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
        if (!password)
            return NextResponse.json({ success: false, error: "Password is required" })

        connectToMongoDB().catch(err => NextResponse.json(err))

        const user = await User.findOne({ email }).select("+password")

        if (!user)
            return NextResponse.json({ success: false, error: "User with this email does not exists" }, { status: 400 })

        const isPasswordCorrect = await compare(password, user.password)

        if (!isPasswordCorrect)
            return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 400 })

        const authToken = generateAuthToken(user._id)
        setAuthCookies(authToken)

        return NextResponse.json({
            success: true,
            msg: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            }
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error })
    }
}