import React, { useEffect, useState } from 'react'
import styles from "./Input.module.scss"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import ErrorText from '../ErrorText/index';

interface InputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name?: string;
    error?: string;
}

const Input = ({ label, value, onChange, type, name, error }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
        if (type === "password" && showPassword) {
            setInputType('text')
        }
        else {
            setInputType(type)
        }
    }, [showPassword, type])

    const togglePasswordIcon = () => {
        setShowPassword(!showPassword)
    }

    const renderPasswordIcon = () => {
        if (showPassword) {
            return (
                <BsEyeSlash className={styles.showHideIcon} onClick={togglePasswordIcon} />
            )
        }
        else {
            return (
                <BsEye className={styles.showHideIcon} onClick={togglePasswordIcon} />
            )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <input
                    type={inputType}
                    className={styles.input}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                />

                <span className={styles.label}> {label} </span>

                {
                    type === "password" &&
                    renderPasswordIcon()
                }
            </div>

            {
                error &&
                <ErrorText
                    text={error}
                />
            }
        </div>
    )
}

export default Input