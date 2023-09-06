import { setAuthCookies } from "@/app/lib/server-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        setAuthCookies("")

        return NextResponse.json({ success: true, msg: "User logged out successfully" })
    } catch (error) {
        return NextResponse.json({ success: false, error })
    }
}