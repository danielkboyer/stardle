
import React, {useState,useEffect} from 'react'
import styles from '../styles/Statistics.module.css'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
export default function Statistics({}){
   
   const  data= {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
          label: 'Guess Distribution',
          data: [12, 40, 3, 5, 2, 3],
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
  };
  

  return (
        <main className={styles.main}>
            <h1>STATISTICS</h1>
            <div className={styles.container}>
              <div className={styles.flex1}>
                <div className={styles.semibold}>
                  1
                </div>
                <div className={styles.customline}>
                  Played
                </div>
                
              </div>
              <div className={styles.flex1}>
              <div className={styles.semibold}>
                  45
                </div>
                <div className={styles.customline}>
                  Win %
                </div>
              </div>
              <div className={styles.flex1}>
              <div className={styles.semibold}>
                  5
                </div>
                <div className={styles.customline}>
                Current Streak
                </div>
              </div>
              <div className={styles.flex1}>
              <div className={styles.semibold}>
                  3
                </div>
                <div className={styles.customline}>
                Max Streak
                </div>
              </div>
            </div>
            <Bar data={data} options={{
              
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