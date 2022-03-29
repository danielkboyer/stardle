
import React, {useState,useEffect} from 'react'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {getCookie, setCookies} from 'cookies-next'
import { ChartData } from 'chart.js';
import Cookies from 'js-cookie';
import { StringifyOptions } from 'querystring';
import { CookieValueTypes } from 'cookies-next/lib/types';
import styles from '../styles/StardleInfo.module.css';
import Link from 'next/link';
import * as ga from '../lib/ga/index'
import { GetStaticProps } from 'next';

export default function StardleInfo({
  coffeeNames
}:{
  coffeeNames:string
}){

  

    const buyMeACoffee = () =>{
      ga.event({
        action: "buy_coffee",
        params : {
          
        }
      });
    }
       const email = () =>{
        ga.event({
          action: "email",
          params : {
            
          }
        });
       }

  return (
        <main className={styles.main}>
            <h1 className={styles.title}>Stardle</h1>
          
            <div >
                I saw all of the new variations of Wordle and thought.. what if I added one more. The cool thing about Stardle is I choose the stars every day, if you want to see me do a star you want email {' '}
                <Link href="mailto: danielkboyer@gmail.com">
                    <a onClick={email} className={styles.a}>me.</a>
                </Link>
                {' '}If you like Stardle consider donating.
               
            </div>

            <div className={styles.title}>
              <h2 className={styles.supporterTitle}>Supporters</h2>
                <a className={styles.bmcButton} onClick={buyMeACoffee} href="https://www.buymeacoffee.com/danielkboyer">
                <img  src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"/>
              </a>
            </div>

           <div className={styles.supporters}>
             <text className={styles.text}>{coffeeNames}</text>
           </div>
        </main>
   
  )
}
