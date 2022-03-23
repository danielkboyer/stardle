
import Head from 'next/head'
import styles from './layout.module.css'
import React, { useEffect } from 'react'
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Statistics from '../pages/statistics'
import Modal from 'react-modal'
import * as ga from '../lib/ga/index'
//440 by 660
Modal.setAppElement("#__next")
export default function Layout({ children }:{
    children : React.ReactNode,
}) {
  const [modalOpen, setModalOpen] = useState(false);
   // Toggle for Modal
   const toggle = () => {
     
    setModalOpen(!modalOpen);


    ga.event({
      action: "opened_stats",
      params : {
        
      }
    })
   }

   
  return (
    
    <div className={styles.container}>

      <Head>
       <title>Stardle - guess famous stars</title>
        <meta name="description" content="Guess famous celebrities! The new Wordle... Stardle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        isOpen={modalOpen}
        contentLabel="Post modal"
        onRequestClose={()=>toggle()}
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <Statistics />
      </Modal>

      <main>
        <div className={styles.topnav}>
          <a className={styles.title} href='https://stardle.app'>STARDLE</a>
          <a className={styles.right}>
            <Image src="/images/question.png" width="24" height="24"/>
          </a>
          <a className={styles.right}>
            <Image src="/images/star.png" width="24" height="24"/>
          </a>
          <div className={styles.right}>
       
          <Image onClick={()=>{setModalOpen(true)}} src="/images/stat.png" width="24" height="24"/>
          
          </div>
        </div>
     
        {children}
        </main>
        
   
        <footer className={styles.footer}>
          Powered by{' '}
          <span className={styles.logo}>
            99 Cent Arizona Watermelon Flavor
          </span>
      </footer>
    </div>
  )
}