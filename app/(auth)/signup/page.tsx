import Signup from '@/app/components/Auth/Signup'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Signup",
    description: "Sign page"
}

const page = () => {
    return (
        <Signup />
    )
}

export default page