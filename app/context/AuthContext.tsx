"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import {
    createContext,
    useState,
    useEffect,
    useContext,
} from "react"
import { IUser } from "../types"

type ContextUser = IUser | null

interface IAuthContext {
    user: ContextUser;
    setUser: React.Dispatch<React.SetStateAction<ContextUser>>
}

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<ContextUser>(null)
    const router = useRouter()

    useEffect(() => {
        const getProfile = async () => {
            try {
                const apiRes = await axios.get("http://localhost:3000/api/user/profile")

                if (apiRes?.data?.success) {
                    setUser(apiRes.data.user)
                }
            } catch (error) {
                router.push("/login")
            }
        }

        getProfile()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error("useAuthContext must be used inside Auth provider");      
    }
    else {
        return context
    }
}