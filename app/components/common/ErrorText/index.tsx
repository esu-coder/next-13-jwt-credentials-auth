import React from 'react'
import styles from "./ErrorText.module.scss"

interface ErrorTextProps {
    text: string;
}

const ErrorText = ({ text }: ErrorTextProps) => {
    return (
        <p className={styles.errorMsg}>
            {text}
        </p>
    )
}

export default ErrorText