
import React, {useState,useEffect} from 'react'
import styles from '../styles/Statistics.module.css'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {getCookie, setCookies} from 'cookies-next'
import { ChartData } from 'chart.js';
import Cookies from 'js-cookie';
import { StringifyOptions } from 'querystring';
import { CookieValueTypes } from 'cookies-next/lib/types';

export default function Statistics({}){
  
const[guess1,setGuess1] = useState(0);
const[guess2,setGuess2] = useState(0);
const[guess3,setGuess3] = useState(0);
const[guess4,setGuess4] = useState(0);
const[guess5,setGuess5] = useState(0);
const[guess6,setGuess6] = useState(0);
const[played,setPlayed] = useState(0);
const[win,setWin] = useState(0);
const[currentStreak,setCurrentStreak] = useState(0);
const[maxStreak,setMaxStreak] = useState(0);
useEffect(() =>{  
  
  function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
  }

  var p1 = getCookie("playedStat");
  if(isString(p1)){
    setPlayed(Number(p1));
  }
  var win1 = getCookie("winStat");
  if(isString(win1)){
    setWin(Number(win1));
  }
  var currentStreak1 = getCookie("currentStreakStat");
  if(isString(currentStreak1)){
    setCurrentStreak(Number(currentStreak1));
  }
  var maxStreak1 = getCookie("maxStreakStat");
  if(isString(maxStreak1)){
    setMaxStreak(Number(maxStreak1));
  }

  var g1 = getCookie("guess1Stat");
  if(isString(g1)){
    setGuess1(Number(g1));
  }

  var g2 = getCookie("guess2Stat");
  if(isString(g2)){
    setGuess2(Number(g2));
  }

  var g3 = getCookie("guess3Stat");
  if(isString(g3)){
    setGuess3(Number(g3));
  }

  var g4 = getCookie("guess4Stat");
  if(isString(g4)){
    setGuess4(Number(g4));
  }

  var g5 = getCookie("guess5Stat");
  if(isString(g5)){
    setGuess5(Number(g5));
  }

  var g6 = getCookie("guess6Stat");
  if(isString(g6)){
    setGuess6(Number(g6));
  }


  });
   
  

  return (
        <main className={styles.main}>
            <h1>STATISTICS</h1>
            <div className={styles.container}>
              <div className={styles.flex1}>
                <div className={styles.semibold}>
                  {played}
                </div>
                <div className={styles.customline}>
                  Played
                </div>
                
              </div>
              <div className={styles.flex1}>
              <div className={styles.semibold}>
                  {(win/played)*100}
                </div>
                <div className={styles.customline}>
                  Win %
                </div>
              </div>
              <div className={styles.flex1}>
              <div className={styles.semibold}>
                  {currentStreak}
                </div>
                <div className={styles.customline}>
                Current Streak
                </div>
              </div>
              <div className={styles.flex1}>
              <div className={styles.semibold}>
                  {maxStreak}
                </div>
                <div className={styles.customline}>
                Max Streak
                </div>
              </div>
            </div>
            <Bar redraw data={{
              labels: ['1', '2', '3', '4', '5', '6'],
              datasets: [{
                  label: 'Guess Distribution',
                  data: [guess1,guess2,guess3,guess4,guess5,guess6],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
            }} 
            options={{
              
              indexAxis: 'y',
              // Elements options apply to all of the options unless overridden in a dataset
              // In this case, we are setting the border of each horizontal bar to be 2px wide
              elements: {
                bar: {
                  borderWidth: 2,
                }
              },
              responsive: true,
              plugins: {
                legend: {
                    display:false,
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Guess Distribution'
                }
            }}} width="400" height="400"></Bar>


           
        </main>
   
  )
}