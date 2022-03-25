
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
export default function StardleInfo({}){

  

    const linkedIn = () =>{
        ga.event({
          action: "linked_in",
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
            <h1>Stardle</h1>
          
            <div>
                I am a recent graduate and I am currently looking for a job so I made Stardle. I also like choosing the stars every day. If you have suggestions for tommorows star email {' '}
                <Link href="mailto: danielkboyer@gmail.com">
                    <a onClick={email} className={styles.a}>me.</a>
                </Link>
                 {' '}If you need a developer you can find me at my{' '}
                <Link href="https://www.linkedin.com/in/daniel-boyer-934293187/">
                    <a onClick={linkedIn} className={styles.a}> 
                    LinkedIn.
                    </a>
                </Link>
            </div>

           
        </main>
   
  )
}