import React from 'react'
import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Card({ data }) {
    console.log("data=", data)
    return (
        <a
            href={`/chapter/${data.chapter_number}`}
            className={styles.card}
        // target="_blank"
        // rel="noopener noreferrer"
        >
            <h2 className={inter.className} style={{ cursor: "pointer" }}>
                {data.chapter_number}. {data.name} <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
                {data.summary.hi}
            </p>
        </a>
    )
}
