import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import {getImageData} from '../lib/stars'
export default function Home({
        starPath,
        pixel1,
        pixel2,
        pixel3,
        pixel4,
        pixel5,
        name
}:{
        starPath:string,
        pixel1:string,
        pixel2:string,
        pixel3:string,
        pixel4:string,
        pixel5:string,
        name:string
  
}){
  return (
    
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Stardle!
        </h1>


        <div className={styles.overlapGrid}>
        <Image src={starPath} alt="Mystery Star" width={400} height={512} />
        <Image src={pixel1} alt="Image Overlay" width={400} height={512} />
        </div>
        <div className={styles.input}>
          <input></input>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            Thomas&apos; farts
          </span>
        </a>
      </footer>
    </div>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  
  const imageData = getImageData();
  return {
    props: 

      imageData
    
      
    
  }
}