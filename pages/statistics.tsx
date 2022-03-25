
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

  const[guesses,setGuesses] = useState([0,0,0,0,0,0]);

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
    console.log(p1);
    setPlayed(Number(p1));
  }
  var win1 = getCookie("winStat");
  if(isString(win1)){
    console.log(win1);
    setWin(Number(win1));
  }
  var currentStreak1 = getCookie("currentStreakStat");
  if(isString(currentStreak1)){
    console.log(currentStreak1);
    setCurrentStreak(Number(currentStreak1));
  }
  var maxStreak1 = getCookie("maxStreakStat");
  if(isString(maxStreak1)){
    console.log(maxStreak1);
    setMaxStreak(Number(maxStreak1));
  }
  var localGuesses = [0,0,0,0,0,0];
  for(var x = 1;x<7;x++){
    var g = getCookie("guess"+x+"Stat");
    if(isString(g)){
      console.log(g);
      localGuesses[x-1] = Number(g);
    }
  }
  setGuesses(localGuesses);


  },[]);
   
  

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
                  {Math.round((win/played)*100)}
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
                  data: guesses,
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