import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
const Home: NextPage = () => {
  return (
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Stardle! 
        </h1>


        <div className={styles.image}>
        <Image src="/images/thomas_boyer.jpg" alt="Mystery Star" width={400} height={512} />
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

export default Home
