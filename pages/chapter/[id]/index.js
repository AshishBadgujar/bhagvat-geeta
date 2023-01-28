import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function () {
    const [chapter, setChapter] = useState({})
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getEnd = async () => {
            try {
                setIsloading(true)
                const res = await fetch(`https://bhagavadgitaapi.in/chapter/${id}/`)
                const temp = await res.json()
                setChapter(temp)
                setIsloading(false)
            } catch (error) {
                console.log(error)
            }
        }
        id && getEnd()
    }, [id])

    return (
        <main className={styles.main}>
            {isLoading ?
                <h3>Loading...</h3>
                :
                <>
                    <div className={styles.description}>
                        <p>
                            {chapter.name}
                        </p>
                    </div>
                    <div className={styles.description} style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                        {Array(chapter.verses_count).fill().map((_, i) =>
                            <a href={`/chapter/${id}/${i + 1}`} className={inter.className} style={{ cursor: "pointer", margin: 5 }}>
                                {i + 1}
                            </a>
                        )}
                    </div>
                </>
            }
        </main>
    )
}

