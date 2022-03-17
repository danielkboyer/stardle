import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { Console } from 'console'
export default function Home({
        starPath,
        pixel1,
        pixel2,
        pixel3,
        pixel4,
        pixel5
}:{
        starPath:string,
        pixel1:string,
        pixel2:string,
        pixel3:string,
        pixel4:string,
        pixel5:string
  
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
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const path = "/images/"+year+month+day+"/";
  const starPath = path+"star.jpg";
  const pixel1 = path+"1.png";
  const pixel2 = path+"2.png";
  const pixel3 = path+"3.png";
  const pixel4 = path+"4.png";
  const pixel5 = path+"5.png";
  
  return {
    props: {
        starPath:starPath,
        pixel1:pixel1,
        pixel2:pixel2,
        pixel3:pixel3,
        pixel4:pixel4,
        pixel5:pixel5,
    
      
    }
  }
}