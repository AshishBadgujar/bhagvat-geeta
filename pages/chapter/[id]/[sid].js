import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function () {
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(1)
    const [chapter, setChapter] = useState({})
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()
    const { id, sid } = router.query
    console.log("id=", id)
    useEffect(() => {
        const getEnd = async () => {
            try {
                const res = await fetch(`https://bhagavadgitaapi.in/chapter/${id}/`)
                const temp = await res.json()
                console.log("end=", temp)
                setChapter(temp)
                // setEnd(temp)

            } catch (error) {
                console.log(error)
            }
        }
        id && getEnd()
    }, [id])
    useEffect(() => {
        const getVerse = async (id) => {
            try {
                const res = await fetch(`https://bhagavadgitaapi.in/slok/${id}/${sid}/`)
                const temp = await res.json()
                setData(temp)
                setIsloading(false)
                console.log(temp)

            } catch (error) {
                console.log(error)
            }
        }
        id && getVerse(id)
    }, [id, sid])

    const moveCounter = (count) => {
        router.push(`/chapter/${id}/${count}`)
    }
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    {chapter.name} / {sid}
                </p>

            </div>
            {isLoading ?
                <p>Loading...</p>
                :
                <a className={styles.card}>
                    <h2 style={{ whiteSpace: "pre-line" }}>
                        {data.slok}
                    </h2>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {data.chinmay?.hc}
                    </p>
                </a>
            }
            <div className={styles.footer} style={{ display: "flex", justifyContent: "space-between" }}>
                {sid > 0 &&
                    <p onClick={() => moveCounter(Number(sid) - 1)} className={inter.className} style={{ cursor: "pointer" }}>
                        <span>&#60;-</span> Previous
                    </p>
                }
                {chapter.verses_count >= sid &&
                    <p onClick={() => moveCounter(Number(sid) + 1)} className={inter.className} style={{ cursor: "pointer" }}>
                        Next <span>-&gt;</span>
                    </p>
                }
            </div>

        </main>
    )
}

