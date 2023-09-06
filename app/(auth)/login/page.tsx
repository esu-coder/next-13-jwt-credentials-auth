import React from 'react'
import { Metadata } from 'next'
import Login from '@/app/components/Auth/Login'

export const metadata: Metadata = {
    title: "Login",
    description: "Login page"
}

function page() {
    return (
        <Login />
    )
}

export default page