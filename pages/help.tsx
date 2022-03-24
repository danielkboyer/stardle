
import React, {useState,useEffect} from 'react'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {getCookie, setCookies} from 'cookies-next'
import { ChartData } from 'chart.js';
import Cookies from 'js-cookie';
import { StringifyOptions } from 'querystring';
import { CookieValueTypes } from 'cookies-next/lib/types';
import styles from '../styles/Help.module.css';
import Link from 'next/link';

export default function Help({}){

  

  return (
        <main className={styles.main}>
            <h1>How to play</h1>
          
            <div>
                Try and guess the stars name based on the limited amount of pixels.{'\n'}
                If you can&apos;t figure it out you can skip and more pixels will be revealed.{'\n'}
                Wrong answers also reveal more pixels.
               
            </div>

           
        </main>
   
  )
}