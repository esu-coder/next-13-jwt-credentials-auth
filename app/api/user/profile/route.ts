import { isUserAuthorised } from "@/app/lib/server-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // is user authorised
        const user = await isUserAuthorised()

        if (!user)
            return NextResponse.json({ success: false, msg: "Please log in to view profile" }, { status: 403 })

        return NextResponse.json({ success: true, user })
    } catch (error) {
        return NextResponse.json({ success: false, error })
    }
}