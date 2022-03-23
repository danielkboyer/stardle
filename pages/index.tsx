
import Image from 'next/image'
import {useRouter} from 'next/router'
import React, {useState,useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { GetStaticProps,GetServerSideProps } from 'next'
import {getImageData} from '../lib/stars'

import { InputType } from 'zlib'
import { bool } from 'prop-types'
import {getCookie, setCookies} from 'cookies-next'
import { CookieValueTypes } from 'cookies-next/lib/types'
import Link from 'next/link'
import * as ga from '../lib/ga/index'
function isBool(cookie: CookieValueTypes):cookie is boolean{
  return (cookie as boolean) !== undefined;
}
function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
}

export default function Home({
        starPath,
        pixel1,
        pixel2,
        pixel3,
        pixel4,
        pixel5,
        pixel6,
        names,
        dateStr,
}:{
        starPath:string,
        pixel1:string,
        pixel2:string,
        pixel3:string,
        pixel4:string,
        pixel5:string,
        pixel6:string,
        names:string[],
        dateStr:string,
  
}){
  
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
    var localGuesses = ["","","","","",""];
    for(var x = 0;x<6;x++){
      var guess = getCookie('guess'+x+dateStr);
      if(isString(guess)){
        localGuesses[x] = guess;
        number = x;
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
      //redirect the page
      solvedStardle(won,guessNumber);
      
    }
    
  })
  const skip = () =>{
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    element.value = "SKIP";
    onGuessSubmit();
  };

  //redirects the page to finished
  const solvedStardle = (won:boolean,guessNumber:number) => {
    
    router.replace({
      pathname:'/finished',
      
      query:{
          starPath:starPath,
          names:names,
          won:won,
          guessNumber:guessNumber
        
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
  const onGuessSubmit = () => {
    
    //if the problem is solved or they have guessed the last guess
    if(guesses[5] != "" || solved)
      return;

    var won = false;
    var onNumber = 0;
    var localSolve = false;

    //retrieve input data
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    var celebName = element.value;
    element.value = "";

    if(celebName == "")
      return;

    //loop through names and check if any match
    var guessedCorrect = false;
    for(var x = 0;x<names.length;x++){
      console.log(names[x]);
      if(names[x] == celebName.toUpperCase()){
        guessedCorrect = true;
      }
    }

    
    
    
    //set the next guess
    for(var x = 0;x<6;x++){
      if(guesses[x] == ""){
        guesses[x] = celebName;
        setGuesses(guesses);
        setCookies("guess"+x+dateStr,celebName,{maxAge:60*60*24});
        onNumber = x;
        ga.event({
          action: "guess",
          params : {
            guessNumber: x,
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
    else if(guesses[4] != ""){
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
      solvedStardle(won,onNumber);
    }
    
    



  };
  return (
    
    
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>



        <div className={styles.overlapGrid}>
        
        {
          guesses[0] == "" && 
          <Image id='pixel1' priority={true} src={pixel1} alt="Star 1" width={400} height={512}/>
        }
        {
          guesses[1] == "" && guesses[0] != "" &&
          <Image id='pixel2' src={pixel2} alt="Star 2" width={400} height={512} hidden={true}/>
        }
        {
          guesses[2] == "" && guesses[1] != "" &&
          <Image id='pixel3' src={pixel3} alt="Star 3" width={400} height={512} hidden={true}/>
        }
        {
          guesses[3] == "" && guesses[2] != "" &&
          <Image id='pixel4' src={pixel4} alt="Star 4" width={400} height={512} hidden={true}/>
        }
        {
          guesses[4] == "" && guesses[3] != "" &&
          <Image id='pixel5' src={pixel5} alt="Star 5" width={400} height={512} hidden={true}/>
        }
        {
          guesses[5] == "" && guesses[4] != "" &&
          <Image id='pixel6' src={pixel6} alt="Star 6" width={400} height={512} hidden={true}/> 
        }
        </div>
        <div className={styles.input}>
          <label>Who&apos;s The Star?</label>
          
          <input id='celebInput' placeholder='Type Celebrities Name Here'></input>
          <button onClick={() => onGuessSubmit()}>SUBMIT</button>
          <button onClick={() => skip()}>SKIP</button>
          
          
        </div>

        <div className={styles.guess}>
          <span>{guesses[0]}</span>
          { guesses[0] != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[1]}</span>
          { guesses[1] != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[2]}</span>
          { guesses[2] != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[3]}</span>
          { guesses[3] != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[4]}</span>
          { guesses[4] != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[5]}</span>
          { guesses[5] != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        
      </main>

    </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const imageData = getImageData();
  return {
    props:  imageData,
    revalidate:60
    
      
    
  }
  
}
