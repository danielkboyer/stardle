
import Image from 'next/image'
import {useRouter} from 'next/router'
import React, {useState,useEffect, KeyboardEventHandler} from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { GetStaticProps,GetServerSideProps } from 'next'
import {getDate,getStardleData} from '../lib/stars'

import { InputType } from 'zlib'
import { bool } from 'prop-types'
import {getCookie, setCookies} from 'cookies-next'
import { CookieValueTypes } from 'cookies-next/lib/types'
import Link from 'next/link'
import * as ga from '../lib/ga/index'
import Guess from '../components/guess'
import Images from '../components/images'
function isBool(cookie: CookieValueTypes):cookie is boolean{
  return (cookie as boolean) !== undefined;
}
function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
}

export default function Home({
        starName,
        starPath,
        pixels,
        stardleNumber,
        names,
}:{
        starName:string,
        starPath:string,
        pixels:string[],
        stardleNumber:string,
        names:string[],
  
}){
  const dateStr = getDate();
  const router = useRouter();
 
  const hideImageClass = styles.hide;
  const[solved,setSolved] = useState(false);
  const[guesses, setGuesses] = useState(["","","","","",""]);

  useEffect(()=>{

     //if the user already solved today's stardle
     var localSolve = getCookie("solved"+dateStr);
     if(isBool(localSolve))
     {
       setSolved(localSolve);
     }
 
 

    //retrieve previous guesses in case of refresh
    var number = 0;
    var localGuesses = [...guesses];
    console.log(localGuesses);
    for(var x = 0;x<6;x++){
      var guess = getCookie('guess'+(x+1)+dateStr);
      if(isString(guess)){
        localGuesses[x] = guess;
        number = x+1;
      }
    }
    //set guesses to the guesses retrieved
    setGuesses(localGuesses);


  
      //redirect the page if todays stardle has been solved
      if(localSolve){
      var didWin = getCookie("won"+dateStr)
      var guessNumber = 7;
      var won = false;
      if(isBool(didWin)){
        console.log("didWin");
        if(didWin){
          won = true;
          guessNumber = number;
        }
      }
      console.log("Guess Number "+guessNumber);
      //redirect the page
      solvedStardle(won,guessNumber,localGuesses);
      
    }
    
  },[])

  //redirects the page to finished
  const solvedStardle = (won:boolean,guessNumber:number,localGuesses:string[]) => {
    
    router.replace({
      pathname:'/finished',
      
      query:{
          starPath:starPath,
          starName:starName,
          won:won,
          stardleNumber:stardleNumber,
          guesses:localGuesses,
          guessNumber: guessNumber

      }
      
    },{
        pathname:"/"
    },
    {
      
    })
  }

  const setStats = (solved:boolean, guessNumber:Number) =>{

    //set which guess they solved it on
    var currentNumber = 0;
    var cookie = getCookie("guess"+guessNumber+"Stat");
    if(isString(cookie)){
      currentNumber = Number(cookie);
    }
    setCookies("guess"+guessNumber+"Stat",currentNumber+1,{maxAge:60*60*24*5840});

    //increase the played stat by 1
    var currentPlayNumber = 0;
    var cookiePlay = getCookie("playedStat");
    if(isString(cookiePlay)){
      currentPlayNumber = Number(cookiePlay);
    }
    setCookies("playedStat",currentPlayNumber+1,{maxAge:60*60*24*5840});

    //if they solved the problem increase the win stat by won
    if(solved){
      var currentWinNumber = 0;
      var cookieWin = getCookie("winStat");
      if(isString(cookieWin)){
        currentWinNumber = Number(cookieWin);
      }
      setCookies("winStat",currentWinNumber+1,{maxAge:60*60*24*5840});
    }

    //we need to find out if they solved yesterday which tells us if we keep there current streak going
    //todo add yesterday cookie and make sure it's compatible with cookies before
    var solvedYesterday = false;
    var yesterdayCookie = getCookie("won"+dateStr);
    if(isBool(yesterdayCookie)){
      solvedYesterday = yesterdayCookie;
    }
    var currentStreakNumber = 0;
    var cookieCurrentStreak = getCookie("currentStreakStat");
    if(isString(cookieCurrentStreak)){
      currentStreakNumber = Number(cookieCurrentStreak);
    }

    if(!solved)
    {
      currentStreakNumber = 0
    }
    else if(solvedYesterday)
    {
      currentStreakNumber +=1;
    }
    else
    {
      currentStreakNumber = 1
    }

    
    setCookies("currentStreakStat",currentStreakNumber,{maxAge:60*60*24*5840});

    
    var currentMaxStreakNumber = 0;
    var cookieMaxCurrentStreak = getCookie("maxStreakStat");
    if(isString(cookieMaxCurrentStreak)){
      currentMaxStreakNumber = Number(cookieMaxCurrentStreak);
    }
    if(currentStreakNumber > currentMaxStreakNumber){
      currentMaxStreakNumber = currentStreakNumber;
    }
    setCookies("maxStreakStat",currentMaxStreakNumber,{maxAge:60*60*24*5840});
  }
  const onGuessSubmit = (celebName:string) => {
    
    //if the problem is solved or they have guessed the last guess
    if(guesses[5] != "" || solved)
      return;

    var won = false;
    var onNumber = 0;
    var localSolve = false;

    //loop through names and check if any match
    var guessedCorrect = starName.toUpperCase().trim() === celebName.toUpperCase().trim();

    
    
    
    //set the next guess
    var localGuesses = [...guesses];
    for(var x = 0;x<6;x++){
      if(localGuesses[x] == ""){
        localGuesses[x] = celebName;
        setGuesses(localGuesses);
        console.log("Set Guesses");
        setCookies("guess"+(x+1)+dateStr,celebName,{maxAge:60*60*24});
        onNumber = x+1;
        ga.event({
          action: "guess",
          params : {
            guessNumber: x+1,
            guess:celebName,
            celebrity:names[0],
          }
        })
        break;
      }
    }


    if(guessedCorrect){
      console.log("Correct");
      setCookies("solved"+dateStr,true,{maxAge:60*60*24*3});
      setCookies("won"+dateStr,true,{maxAge:60*60*24*3});
      setSolved(true);
      won = true;
      localSolve = true;

      ga.event({
        action: "won",
        params : {
          guessNumber: onNumber,
          guess:celebName,
          celebrity:names[0],
        }
      })

    }
    else if(localGuesses[5] != ""){
      won = false;
      localSolve = true;
      setCookies("solved"+dateStr,true,{maxAge:60*60*24*3});
      ga.event({
        action: "lost",
        params : {
          guess:celebName,
          celebrity:names[0]
        }
      })
    }

    //check if they solved the puzzle
    if(localSolve == true){
      if(!won){
        onNumber = 7;
      }
      setStats(won,onNumber);
      solvedStardle(won,onNumber,localGuesses);
    }
    
    



  };
  return (
    
    
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>

        <Images guesses={guesses} pixels={pixels}/> 
       

        <Guess options={names} deleteFunction={undefined} skipFunction={undefined} pushFunction={undefined} guesses={guesses} guessFunction={onGuessSubmit} onNumber={7}/>
        
      </main>

    </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  


  console.log("Getting Static Props Index");
  const imageData = await getStardleData(getDate() as string,60*24);
  return {
    props:  imageData,
    revalidate:60
    
      
    
  }
  
}
