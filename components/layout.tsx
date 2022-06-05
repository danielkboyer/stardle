
import Head from 'next/head'
import styles from './layout.module.css'
import React, { useEffect } from 'react'
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Statistics from '../pages/statistics'
import StardleInfo from '../pages/stardleInfo';
import Modal from 'react-modal'
import * as ga from '../lib/ga/index'
import Help from '../pages/help'
import { GetStaticProps } from 'next'
//440 by 660
Modal.setAppElement("#__next")
export default function Layout({ children}:{
    children : React.ReactNode,
}) {
  const [statisticsOpen, setStatisticsOpen] = useState(false);
   // Toggle for Modal
    const toggleStatistics = () => {
    
      setStatisticsOpen(!statisticsOpen);
  
  
      ga.event({
        action: "opened_stats",
        params : {
          
        }
      })
      }
  

   const [stardleInfoOpen, setStardleInfoOpen] = useState(false);
   // Toggle for Modal
   const toggleStardleInfo = () => {
     
    setStardleInfoOpen(!stardleInfoOpen);


    ga.event({
      action: "opened_stardle_info",
      params : {
        
      }
    })
   }


   const [helpOpen, setHelpOpen] = useState(false);
   // Toggle for Modal
   const toggleHelpOpen = () => {
     
    setHelpOpen(!helpOpen);


    ga.event({
      action: "opened_help",
      params : {
        
      }
    })
   }


   const buyMeACoffee = () =>{
    ga.event({
      action: "buy_coffee_footer",
      params : {
        
      }
    });
   }
   
  return (
    
    <div className={styles.container}>

      <Head>
        <title>Stardle - Guess famous stars</title>
        <meta name="description" content="Guess famous celebrities! The new Wordle... Stardle! In this spin-off of Wordle, you receive a limited amount of pixels and must guess the star
        the best you can. Every incorrect answer reveals more pixels. Share your results with your friends and come back for tommorows stardle." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8577908781657467"
     crossOrigin="anonymous"></script>
      </Head>

      <Modal
        isOpen={statisticsOpen}
        contentLabel="Statistics modal"
        onRequestClose={()=>toggleStatistics()}
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <Statistics />
      </Modal>

      <Modal
        isOpen={stardleInfoOpen}
        contentLabel="Stardle Info modal"
        onRequestClose={()=>toggleStardleInfo()}
        className={styles.ModalStar}
        overlayClassName={styles.Overlay}
      >
        <StardleInfo  />
      </Modal>

      <Modal
        isOpen={helpOpen}
        contentLabel="help modal"
        onRequestClose={()=>toggleHelpOpen()}
        className={styles.ModalHelp}
        overlayClassName={styles.Overlay}
      >
        <Help />
      </Modal>

      <main>
        
        <div className={styles.topnav}>
          <Link  href='/'>
            <h1 className={styles.title}>STARDLE</h1>
          </Link>
          <div className={styles.right}>
            <Image onClick={()=>{setHelpOpen(true)}} src="/images/question.png" width="24" height="24"/>
          </div>
          <div className={styles.right}>
            <Image onClick={()=>{setStardleInfoOpen(true)}} src="/images/star.png" width="24" height="24"/>
          </div>
          <div className={styles.right}>
       
          <Image onClick={()=>{setStatisticsOpen(true)}} src="/images/stat.png" width="24" height="24"/>
          
          </div>
        </div>
     
        {children}
        </main>
        
   
        <footer className={styles.footer}>
          <a className={styles.bmcButton} onClick={buyMeACoffee} href="https://www.buymeacoffee.com/danielkboyer">
            <img  src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/>
           </a>
      </footer>
    </div>
  )
}

