import React from 'react'
import styles from "./Button.module.scss"

interface ButtonProps {
    title: string;
    type?: 'submit' | 'button' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({ title, type, onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles.container}
        >
            {title}
        </button>
    )
}

export default Button