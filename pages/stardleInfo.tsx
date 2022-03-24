
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

export default function StardleInfo({}){

  

  return (
        <main className={styles.main}>
            <h1>Stardle</h1>
          
            <div>
                I am currently looking for a job and super bored so I made Stardle.
                 If you need a developer you can find me at my{' '}
                <Link href="https://www.linkedin.com/in/daniel-boyer-934293187/">
                    <a className={styles.a}> 
                    LinkedIn.
                    </a>
                </Link>
            </div>

           
        </main>
   
  )
}