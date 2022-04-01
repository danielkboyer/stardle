
import Image from 'next/image'
import {useRouter} from 'next/router'
import React, {useState,useEffect, KeyboardEventHandler} from 'react'
import styles from '../../styles/History.module.css';
import Layout from '../../components/layout'
import { GetStaticProps,GetServerSideProps, GetStaticPaths } from 'next'
import {getAllStardleIds, getStardleData} from '../../lib/histories'
import {getCookie, setCookies} from 'cookies-next'
import { CookieValueTypes } from 'cookies-next/lib/types'
import * as ga from '../../lib/ga/index'
import Guess from '../../components/guess'
import Images from '../../components/images'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link';
import Share from '../../components/share';
function isBool(cookie: CookieValueTypes):cookie is boolean{
  return (cookie as boolean) !== undefined;
}
function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
}

export default function History({
        starPath,
        pixels,
        names,
        dateStr,
        stardleNumber
}:{
        starPath:string,
        pixels:string[]
        names:string[],
        dateStr:string,
        stardleNumber:string
  
}){
  console.log(`Received StarPath: ${starPath}\n
  pixels ${pixels}\n
  names ${names}\n
  dateStr ${dateStr}\n
  stardleNumber ${stardleNumber}`);

  var prevNumber = (parseInt(stardleNumber)-1).toString();
  const[shareMessage,setShareMessage] = useState("But like you didn't finish yet....");
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
        ga.event({
          action: "guess_"+stardleNumber,
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
      setSolved(true);
      setWon(true);
      localSolve = true;
      ga.event({
        action: "won_"+stardleNumber,
        params : {
          guessNumber: onNumber,
          guess:celebName,
          celebrity:names[0],
        }
      })

    }
    else if(localGuesses[5] != ""){
      setWon(false);
      setSolved(true);
      localSolve = true;
      ga.event({
        action: "lost_"+stardleNumber,
        params : {
          guess:celebName,
          celebrity:names[0]
        }
      })
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

        <Images guesses={guesses} pixels={pixels}/> 
       
        <Link href={`/stardles/${prevNumber}`}>
            <a onClick={resetVariables}>{"More?! Go Yesterday Again."}</a>
        </Link>
        {(won || solved) &&
        <Share  
        number={onNumber}
        guesses={guesses}
        won={won}
        stardleNumber={stardleNumber}
        />}
        <Guess guesses={guesses} guessFunction={onGuessSubmit} />
        
      </main>

    </div>
    </Layout>
  )
}
export const getStaticPaths:GetStaticPaths = async ()=>{
  const paths = getAllStardleIds();
  console.log("Static Paths: "+paths);
  return {
    paths,
    fallback: false
  }
}
interface IParams extends ParsedUrlQuery{
  id:string
}
export const getStaticProps: GetStaticProps = async (context) => {
  
  console.log(context);
  const params = context.params as IParams;
  console.log(params);
  const postData = getStardleData(params.id) as {  
    starPath:string,
    pixels:string[],
    names:string[],
    dateStr:string,
    stardleNumber:string}
    console.log(postData);
  return {
    props:  postData,
    revalidate: 60
    
    
  }
  
}




