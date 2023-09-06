"use client"
import { isObjectEmpty } from '@/app/lib/client-helpers'
import { validateSignupData } from '@/app/lib/validators'
import { InputError, SignupFormInput } from '@/app/types'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from "./Auth.module.scss"
import InfoText from './InfoText'
import { redirect } from "next/navigation"
import ErrorText from '../common/ErrorText/index'
import { useAuthContext } from '@/app/context/AuthContext'

const Signup = () => {
    const { user, setUser } = useAuthContext()

    const [data, setData] = useState<SignupFormInput>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [validationError, setValidationError] = useState<InputError>({})
    const [submitError, setSubmitError] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const err = validateSignupData(data)

        setValidationError(err)

        const isValid = isObjectEmpty(err)

        if (isValid) {
            try {
                const apiRes = await axios.post("http://localhost:3000/api/auth/signup", data)

                if (apiRes?.data?.success) {
                    setSubmitError("")
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

    if(user) return redirect("/profile")
    
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSignup}>
                <h2 className={styles.title}> Sign up </h2>

                <Input
                    label={"Name"}
                    name={"name"}
                    value={data.name}
                    onChange={handleInputChange}
                    error={validationError.name}
                />

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

                <Input
                    label={"Confirm Password"}
                    name={"confirmPassword"}
                    type={"password"}
                    value={data.confirmPassword}
                    onChange={handleInputChange}
                    error={validationError.confirmPassword}
                />

                <Button type={"submit"} title={"Sign up"} />

                {
                    submitError &&
                    <ErrorText text={submitError} />
                }

                <InfoText
                    text={"Already have an account ?"}
                    linkHref={"/login"}
                    linkTitle={"Login"}
                />
            </form>
        </div>
    )
}

export default Signup