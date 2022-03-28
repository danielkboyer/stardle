
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
                I saw all of the new variations of Wordle and thought.. what if I added one more. The cool thing about Stardle is I choose the stars every day, if you want to see me do a star you want email {' '}
                <Link href="mailto: danielkboyer@gmail.com">
                    <a onClick={email} className={styles.a}>me.</a>
                </Link>
               
            </div>

           
        </main>
   
  )
}