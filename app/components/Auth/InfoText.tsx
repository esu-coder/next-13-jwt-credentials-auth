import Link from 'next/link';
import React from 'react'
import styles from "./Auth.module.scss"

interface InfoTextProps {
    text: string;
    linkHref: string;
    linkTitle: string;
}

const InfoText = ({ text, linkHref, linkTitle }: InfoTextProps) => {
    return (
        <div>
            <span className={styles.infoText}>
                {text}
            </span>

            <Link className={styles.link} href={linkHref}>
                {linkTitle}
            </Link>
        </div>
    )
}

export default InfoText