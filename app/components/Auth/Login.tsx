"use client"
import { isObjectEmpty } from '@/app/lib/client-helpers'
import { validateLoginData } from '@/app/lib/validators'
import { InputError, LoginFormInput } from '@/app/types'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import Button from '../common/Button/index'
import Input from '../common/Input'
import styles from "./Auth.module.scss"
import InfoText from './InfoText'
import { redirect } from "next/navigation"
import ErrorText from '../common/ErrorText/index'
import { useAuthContext } from '@/app/context/AuthContext'

const Login = () => {
    const { user, setUser } = useAuthContext()

    const [data, setData] = useState<LoginFormInput>({
        email: "",
        password: ""
    })

    const [validationError, setValidationError] = useState<InputError>({})
    const [submitError, setSubmitError] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const err = validateLoginData(data)
        setValidationError(err)

        const isValid = isObjectEmpty(err)

        if (isValid) {
            try {
                const apiRes = await axios.post("http://localhost:3000/api/auth/login", data)

                if (apiRes?.data?.success) {
                    setSubmitError("")
                    console.log(apiRes.data)
                    setUser(apiRes.data.user)
                }

            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }
        }
    }

    if (user) return redirect("/profile")

    return (
        <div className={styles.container}>
            <form className={`${styles.form} ${styles.loginForm}`} onSubmit={handleLogin}>
                <h2 className={styles.title}> Login </h2>

                <Input
                    label={"Email"}
                    name={"email"}
                    value={data.email}
                    onChange={handleInputChange}
                    error={validationError.email}
                />

                <Input
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    value={data.password}
                    onChange={handleInputChange}
                    error={validationError.password}
                />

                <Button type={"submit"} title={"Login"} />

                {
                    submitError &&
                    <ErrorText text={submitError} />
                }

                <InfoText
                    text={"Don't have an account ?"}
                    linkHref={"/signup"}
                    linkTitle={"Sign up"}
                />
            </form>
        </div>
    )
}

export default Login