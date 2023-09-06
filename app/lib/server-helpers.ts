import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import User from "../models/user";
import { IUser } from "../types/index";
import { connectToMongoDB } from "./mongodb";

const { JWT_TOKEN } = process.env
const isProduction = process.env.NODE_ENV === 'production'

if (!JWT_TOKEN)
    throw new Error("Inavlid env var: JWT_TOKEN");

export const generateAuthToken = (_id: string): string => {
    return jwt.sign({ _id }, JWT_TOKEN, { expiresIn: '7d' })
}

export const setAuthCookies = (value: string): void => {
    cookies().set({
        name: 'auth-token',
        value: value,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: value ? 7 * 24 * 60 * 60 : 0
    })
}

export const isUserAuthorised = async () => {
    const token = cookies().get('auth-token')?.value
    let user: IUser | null = null

    if (token) {
        const data = jwt.verify(token, JWT_TOKEN)

        if (typeof data !== 'string') {
            try {
                connectToMongoDB().catch(err => { throw new Error(err) })
                user = await User.findById(data._id)
                return user
            } catch (error) {
                return null
            }
        }

        return user
    }

    return user
}