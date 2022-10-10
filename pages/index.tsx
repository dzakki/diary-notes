import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import NoteEditor from '../components/NoteEditor'
import styles from '../styles/Home.module.css'
import { INITIAL_NOTE, GUIDLINES_NOTE } from '../constants'
import { Note as NoteType } from '../interfaces';


const Home: NextPage = () => {
  const [notes, setNotes] = useState<NoteType[]>([{ 
    id: 1,
    content: GUIDLINES_NOTE
   }])

  const addNote = () => {
    setNotes(prev => {
      let id = 1
      if (prev.length) {
        id = prev[0].id + 1
      }

      return [
        {
          ...INITIAL_NOTE,
          id
        },
        ...prev
      ]
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Diary Notes</title>
        <meta name="description" content="Diary Notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.titlePage}>Diary Notes</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardAddContent} onClick={addNote}>
              <Image
                src={require('../assets/icon-plus.png')}
                alt="icon-plus"
                objectFit='contain'
              />
            </div>
          </div>
          {
            notes.map(note => (
              <div className={styles.card} key={note.id}>
                <div className={styles.cardContent}>
                  <NoteEditor initialValue={note.content} />
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default Home
