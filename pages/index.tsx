
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
}:{
        starPath:string,
        pixel1:string,
        pixel2:string,
        pixel3:string,
        pixel4:string,
        pixel5:string,
        pixel6:string,
        names:string[],
  
}){
  
  const router = useRouter();
  const dateObj = new Date();
  dateObj.setHours(dateObj.getUTCHours() - 6);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const dateStr = year+''+month+''+day;
  const hideImageClass = styles.hide;
  const[solved,setSolved] = useState(false);
  const[guess1, setGuess1] = useState("");
  const[guess2, setGuess2] = useState("");
  const[guess3, setGuess3] = useState("");
  const[guess4, setGuess4] = useState("");
  const[guess5, setGuess5] = useState("");
  const[guess6, setGuess6] = useState("");

  const[pixel1Class,setPixel1Class] = useState("");
  const[pixel2Class,setPixel2Class] = useState("");
  const[pixel3Class,setPixel3Class] = useState("");
  const[pixel4Class,setPixel4Class] = useState("");
  const[pixel5Class,setPixel5Class] = useState("");
  const[pixel6Class,setPixel6Class] = useState("");
  useEffect(()=>{

    function isString(cookie: CookieValueTypes):cookie is string{
      return (cookie as string) !== undefined;
    }

   
    var localSolve = getCookie("solved"+dateStr);
    if(isBool(localSolve))
    {
    setSolved(localSolve);
    }

    var number = 0;
    var guess1 = getCookie('guess1'+dateStr);
    if(isString(guess1)){
      setGuess1(guess1);
      number = 1;
    }
    var guess2 = getCookie('guess2'+dateStr);
    if(isString(guess2)){
      setGuess2(guess2);
      number = 2;
    }
    var guess3 = getCookie('guess3'+dateStr);
    if(isString(guess3)){
      setGuess3(guess3);
      number = 3;
    }
    var guess4 = getCookie('guess4'+dateStr);
    if(isString(guess4)){
      setGuess4(guess4);
      number = 4;
    }
    var guess5 = getCookie('guess5'+dateStr);
    if(isString(guess5)){
      setGuess5(guess5);
      number = 5;
    }
    var guess6 = getCookie('guess6'+dateStr);
    if(isString(guess6)){
      setGuess6(guess6);
      number = 6;
    }
    
    if(localSolve){
      var didWin = getCookie("won"+dateStr)
      var guessNumber = number;
      var won = false;
      if(isBool(didWin)){
        console.log("didWin");
        if(didWin === false){

          guessNumber = 7;
        }
        else{
          won = true;
        }
      }
      else{
        guessNumber = 7;
      }
      router.push({
        pathname:'/finished',
        
        query:{
            starPath:starPath,
            names:names,
            won:won,
            guessNumber:guessNumber
          
        }
        
      },{
          pathname:router.basePath
      })
    }

    setPixel1Class(localSolve != true && guess1 == undefined? "":hideImageClass)
    setPixel2Class(localSolve != true && guess2 == undefined && guess1 != undefined? "":hideImageClass)
    setPixel3Class(localSolve != true && guess3 == undefined && guess2 != undefined? "":hideImageClass)
    setPixel4Class(localSolve != true && guess4 == undefined && guess3 != undefined? "":hideImageClass)
    setPixel5Class(localSolve != true && guess5 == undefined && guess4 != undefined? "":hideImageClass)
    setPixel6Class(localSolve != true && guess6 == undefined && guess5 != undefined? "":hideImageClass)
    
  })
  const skip = () =>{
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    element.value = "SKIP";
    onGuessSubmit();
  };

  const setStats = (solved:boolean, guessNumber:Number) =>{
    var currentNumber = 0;
    var cookie = getCookie("guess"+guessNumber+"Stat");
    if(isString(cookie)){
      currentNumber = Number(cookie);
    }
    setCookies("guess"+guessNumber+"Stat",currentNumber+1,{maxAge:60*60*24*5840});

    var currentPlayNumber = 0;
    var cookiePlay = getCookie("playedStat");
    if(isString(cookiePlay)){
      currentPlayNumber = Number(cookiePlay);
    }
    setCookies("playedStat",currentPlayNumber+1,{maxAge:60*60*24*5840});

    if(solved){
      var currentWinNumber = 0;
      var cookieWin = getCookie("winStat");
      if(isString(cookieWin)){
        currentWinNumber = Number(cookieWin);
      }
      setCookies("winStat",currentWinNumber+1,{maxAge:60*60*24*5840});
    }

    // const dateObj = new Date();
    // const month = dateObj.getUTCMonth() + 1; //months from 1-12
    // const day = dateObj.getUTCDate()-1;
    // const year = dateObj.getUTCFullYear();

    // const dateStr = year+''+month+''+day;

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
    if(!solved){
      currentStreakNumber = 0
    }
    else{
    if(solvedYesterday){
      currentStreakNumber +=1;
    }
    else{
      currentStreakNumber = 1
    }

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
    
    if(guess6 != "" || solved)
      return;
    var won = false;
    var onNumber = 0;
    var localSolve = false;
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    var celebName = element.value;
    element.value = "";

    if(celebName == "")
      return;

    var guessedCorrect = false;
    for(var x = 0;x<names.length;x++){
      console.log(names[x]);
      if(names[x] == celebName.toUpperCase()){
        guessedCorrect = true;
      }
    }
    if(guessedCorrect){
      console.log("Correct");
      setCookies("solved"+dateStr,true,{maxAge:60*60*24*3});
      setCookies("won"+dateStr,true,{maxAge:60*60*24*3});
      setSolved(true);
      won = true;
      localSolve = true;
      setPixel1Class(hideImageClass);
      setPixel2Class(hideImageClass);
      setPixel3Class(hideImageClass);
      setPixel4Class(hideImageClass);
      setPixel5Class(hideImageClass);
      setPixel6Class(hideImageClass);

    }
    else if(guess5 != ""){
      won = false;
      localSolve = true;
      setCookies("solved"+dateStr,true,{maxAge:60*60*24*3});
    }

    if(guess1 == ""){
      console.log("guess1");
      setGuess1(celebName);
      setCookies("guess1"+dateStr,celebName,{maxAge:60*60*24});
      setPixel1Class(styles.hide);
      setPixel2Class("");
      onNumber = 1;
    }
    else if(guess2 == ""){
      console.log("guess2");
      setGuess2(celebName);
      setCookies("guess2"+dateStr,celebName,{maxAge:60*60*24});
      setPixel2Class(styles.hide);
      setPixel3Class("");
      onNumber = 2;
    }
    else if(guess3 == ""){
      console.log("guess3");
      setGuess3(celebName);
      setCookies("guess3"+dateStr,celebName,{maxAge:60*60*24});
      setPixel3Class(styles.hide);
      setPixel4Class("");
      onNumber = 3;
    }
    else if(guess4 == ""){
      console.log("guess4");
      setGuess4(celebName);
      setCookies("guess4"+dateStr,celebName,{maxAge:60*60*24});
      setPixel4Class(styles.hide);
      setPixel5Class("");
      onNumber = 4;
    }
    else if(guess5 == ""){
      console.log("guess5");
      setGuess5(celebName);
      setCookies("guess5"+dateStr,celebName,{maxAge:60*60*24});
      setPixel5Class(styles.hide);
      setPixel6Class("");
      onNumber = 5;
    }
    else if(guess6 == ""){
      console.log("guess6");
      setGuess6(celebName);
      setCookies("guess6"+dateStr,celebName,{maxAge:60*60*24});
      setPixel6Class(styles.hide);
      onNumber = 6;
    }

    if(localSolve == true){
      if(!won){
        onNumber = 7;
      }
      setStats(won,onNumber);

      router.push({
        pathname:'/finished',
        
        query:{
            starPath:starPath,
            names:names,
            won:won,
            guessNumber:onNumber
          
        }
        
      },{
          pathname:router.basePath
      })
    }
    
    



  };
  return (
    
    
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>



        <div className={styles.overlapGrid}>
        
        
        <Image id='pixel1' priority={true} className={pixel1Class} src={pixel1} alt="Star 1" width={400} height={512} hidden={true}/>
        <Image id='pixel2' className={pixel2Class} src={pixel2} alt="Star 2" width={400} height={512} hidden={true}/>
        <Image id='pixel3' className={pixel3Class} src={pixel3} alt="Star 3" width={400} height={512} hidden={true}/>
        <Image id='pixel4' className={pixel4Class} src={pixel4} alt="Star 4" width={400} height={512} hidden={true}/>
        <Image id='pixel5' className={pixel5Class} src={pixel5} alt="Star 5" width={400} height={512} hidden={true}/>
        <Image id='pixel6' className={pixel6Class} src={pixel6} alt="Star 6" width={400} height={512} hidden={true}/> 
        
        </div>
        <div className={styles.input}>
          <label>Who&apos;s The Star?</label>
          
          <input id='celebInput' placeholder='Type Celebrities Name Here'></input>
          <button onClick={() => onGuessSubmit()}>SUBMIT</button>
          <button onClick={() => skip()}>SKIP</button>
          
          
        </div>

        <div className={styles.guess}>
          <span>{guess1}</span>
          { guess1 != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guess2}</span>
          { guess2 != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guess3}</span>
          { guess3 != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guess4}</span>
          { guess4 != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guess5}</span>
          { guess5 != "" &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guess6}</span>
          { guess6 != "" &&
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
