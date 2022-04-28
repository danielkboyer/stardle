
import Image from 'next/image'
import {useRouter} from 'next/router'
import React, {useState,useEffect, KeyboardEventHandler} from 'react'
import styles from '../styles/History.module.css';
import Layout from '../components/layout'
import { GetStaticProps,GetServerSideProps, GetStaticPaths } from 'next'
import {getCookie, setCookies} from 'cookies-next'
import { CookieValueTypes } from 'cookies-next/lib/types'
import * as ga from '../lib/ga/index'
import Guess from '../components/guess'
import Images from '../components/images'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link';
import Share from '../components/share';
import { getStardleData } from '../lib/creator';
function isBool(cookie: CookieValueTypes):cookie is boolean{
  return (cookie as boolean) !== undefined;
}
function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
}

export default function Creation({
        starPath,
        pixels,
        names,
        dateStr,
        stardleNumber,
        originalNumber
}:{
        starPath:string,
        pixels:string[]
        names:string[],
        dateStr:string,
        stardleNumber:string,
        originalNumber:number
  
}){
  console.log(`Received StarPath: ${starPath}\n
  pixels ${pixels}\n
  names ${names}\n
  dateStr ${dateStr}\n
  stardleNumber ${stardleNumber}`);

  var prevNumber = (parseInt(stardleNumber)-1).toString();
  const[solved,setSolved] = useState(false);
  const[won,setWon] = useState(false);
  const[guesses, setGuesses] = useState(["","","","","",""]);
  const[onNumber,setOnNumber] = useState(7);

  const onGuessSubmit = (celebName:string) => {
    
    //if the problem is solved or they have guessed the last guess
    if(guesses[5] != "" || solved)
      return;

    var onNumberLocal = 0;
    var localSolve = false;

    //loop through names and check if any match
    var guessedCorrect = false;
    for(var x = 0;x<names.length;x++){

      if(names[x] == celebName.toUpperCase().trim()){
        guessedCorrect = true;
      }
    }

    
    
    
    //set the next guess
    var localGuesses = [...guesses];
    for(var x = 0;x<6;x++){
      if(localGuesses[x] == ""){
        localGuesses[x] = celebName;
        setGuesses(localGuesses);
        console.log("Set Guesses");

        onNumberLocal = x+1;
     
        break;
      }
    }


    if(guessedCorrect){
      console.log("Correct");
      setWon(true);
      setSolved(true);
      localSolve = true;
      

    }
    else if(localGuesses[5] != ""){
      setWon(false);
      setSolved(true);
      onNumberLocal = 7;
      localSolve = true;
    
    }

    if(localSolve){
      setOnNumber(onNumberLocal);
    }



  };

  function resetVariables() {
    setSolved(false);
    setWon(false);
    setGuesses(["","","","","",""]);
  }
  return (
    
    
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>
        {!solved &&
        <Images guesses={guesses} pixels={pixels}/> 
        }
        {solved &&
        <Image src={starPath} width={400} height={512}></Image>
        }
        <label className={styles.title}>{"Stardle #"+stardleNumber}</label>
        {solved &&
        <h2 className={styles.title}>{names[0]}</h2>
        }
       {parseInt(prevNumber) > 0 && originalNumber -3 <= parseInt(prevNumber) &&
        <Link href={`/stardles/${prevNumber}`}>
            <a className={styles.wantMore} onClick={resetVariables}>{"More?! Go Yesterday Again."}</a>
        </Link>
      }
        {(solved) &&
        <Share  
        number={onNumber}
        guesses={guesses}
        won={won}
        stardleNumber={stardleNumber}
        />}
        <Guess guesses={guesses} guessFunction={onGuessSubmit} onNumber={onNumber-1}/>
        
      </main>

    </div>
    </Layout>
  )
}

interface IParams extends ParsedUrlQuery{
  id:string
}


export const getServerSideProps: GetServerSideProps = async () => {
  


    const postData = getStardleData("6") as {  
      starPath:string,
      pixels:string[],
      names:string[],
      dateStr:string,
      stardleNumber:string,
        originalNumber:number}
      console.log(postData);
    return {
      props:  postData
      
      
    }
    
  }
  