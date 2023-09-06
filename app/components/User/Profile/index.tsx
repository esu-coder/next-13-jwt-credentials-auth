"use client"
import { useAuthContext } from '@/app/context/AuthContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import Button from '../../common/Button/index'
import styles from "./Profile.module.scss"

const Profile = () => {
    const { user, setUser } = useAuthContext()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const apiRes = await axios.post("http://localhost:3000/api/auth/logout")

            if (apiRes?.data?.success) {
                setUser(null)
                router.push("/login")
            }
        } catch (error) {
            // show error
        }
    }

    if (user) {
        return (
            <div className={styles.container}>
                <h3 className={styles.greeting}>
                    Hello {user.name}
                </h3>

                <div className={styles.buttonContainer}>
                    <Button title={"Logout"} onClick={handleLogout} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div> Loading... </div>
        )
    }
}

export default Profile