
import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { GetStaticProps,GetServerSideProps } from 'next'
import {getImageData} from '../lib/stars'
import Share from '../components/share'
import { InputType } from 'zlib'
import { bool } from 'prop-types'
import {getCookie, setCookies} from 'cookies-next'
import { CookieValueTypes } from 'cookies-next/lib/types'
import Link from 'next/link'

class UserData{
  
    solved:boolean;
    guess1:string;
    guess2:string;
    guess3:string;
    guess4:string;
    guess5:string;
    guess6:string;
    constructor(solved:boolean,guess1:string,guess2:string,guess3:string,guess4:string,guess5:string,guess6:string){

      this.solved = solved
      this.guess1 = guess1;
      this.guess2 = guess2;
      this.guess3 = guess3;
      this.guess4 = guess4;
      this.guess5 = guess5;
      this.guess6 = guess6;
    }

}

export default function Home({
        starPath,
        pixel1,
        pixel2,
        pixel3,
        pixel4,
        pixel5,
        pixel6,
        name
}:{
        starPath:string,
        pixel1:string,
        pixel2:string,
        pixel3:string,
        pixel4:string,
        pixel5:string,
        pixel6:string,
        name:string
  
}){
  

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const dateStr = year+''+month+''+day;
  const hideImageClass = styles.hide;
  const[solved,setSolved] = useState("false");
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
    var checkSolve = false;
    var localSolve = getCookie("solved"+dateStr);
    if(isString(localSolve))
    {
      setSolved(localSolve);
      checkSolve = true;
    }
    var guess1 = getCookie('guess1'+dateStr);
    if(isString(guess1))
      setGuess1(guess1);
    var guess2 = getCookie('guess2'+dateStr);
    if(isString(guess2))
      setGuess2(guess2);
    var guess3 = getCookie('guess3'+dateStr);
    if(isString(guess3))
      setGuess3(guess3);
    var guess4 = getCookie('guess4'+dateStr);
    if(isString(guess4))
      setGuess4(guess4);
    var guess5 = getCookie('guess5'+dateStr);
    if(isString(guess5))
      setGuess5(guess5);
    var guess6 = getCookie('guess6'+dateStr);
    if(isString(guess6))
      setGuess6(guess6);
    
    setPixel1Class(checkSolve != true && guess1 == undefined? "":hideImageClass)
    setPixel2Class(checkSolve != true && guess2 == undefined && guess1 != undefined? "":hideImageClass)
    setPixel3Class(checkSolve != true && guess3 == undefined && guess2 != undefined? "":hideImageClass)
    setPixel4Class(checkSolve != true && guess4 == undefined && guess3 != undefined? "":hideImageClass)
    setPixel5Class(checkSolve != true && guess5 == undefined && guess4 != undefined? "":hideImageClass)
    setPixel6Class(checkSolve != true && guess6 == undefined && guess5 != undefined? "":hideImageClass)
    
  })
  const skip = () =>{
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    element.value = "SKIP";
    onGuessSubmit();
  };
  const onGuessSubmit = () => {
    
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    var celebName = element.value;
    element.value = "";

    if(celebName == "")
      return;

    if(celebName?.toUpperCase() == name){
      console.log("Correct");
      setCookies("solved"+dateStr,"true",{maxAge:60*60*24});
      setSolved("true");
      setPixel1Class(hideImageClass);
      setPixel2Class(hideImageClass);
      setPixel3Class(hideImageClass);
      setPixel4Class(hideImageClass);
      setPixel5Class(hideImageClass);
      setPixel6Class(hideImageClass);
    }

    if(guess1 == ""){
      console.log("guess1");
      setGuess1(celebName);
      setCookies("guess1"+dateStr,celebName,{maxAge:60*60*24});
      setPixel1Class(styles.hide);
      setPixel2Class("");
    }
    else if(guess2 == ""){
      console.log("guess2");
      setGuess2(celebName);
      setCookies("guess2"+dateStr,celebName,{maxAge:60*60*24});
      setPixel2Class(styles.hide);
      setPixel3Class("");
    }
    else if(guess3 == ""){
      console.log("guess3");
      setGuess3(celebName);
      setCookies("guess3"+dateStr,celebName,{maxAge:60*60*24});
      setPixel3Class(styles.hide);
      setPixel4Class("");
    }
    else if(guess4 == ""){
      console.log("guess4");
      setGuess4(celebName);
      setCookies("guess4"+dateStr,celebName,{maxAge:60*60*24});
      setPixel4Class(styles.hide);
      setPixel5Class("");
    }
    else if(guess5 == ""){
      console.log("guess5");
      setGuess5(celebName);
      setCookies("guess5"+dateStr,celebName,{maxAge:60*60*24});
      setPixel5Class(styles.hide);
      setPixel6Class("");
    }
    else if(guess6 == ""){
      console.log("guess6");
      setGuess6(celebName);
      setCookies("guess6"+dateStr,celebName,{maxAge:60*60*24});
      setPixel6Class(styles.hide);
    }

  
    
    



  };
  return (
    
    
    <Layout>
    <div className={styles.container}>

      <main className={styles.main}>



        <div className={styles.overlapGrid}>
        <Image src={starPath} alt="Mystery Star" width={400} height={512} >
        
        </Image>
        <Image id='pixel1' priority={true} className={pixel1Class} src={pixel1} alt="Image Overlay" width={400} height={512} hidden={true}/>
        <Image id='pixel2' className={pixel2Class} src={pixel2} alt="Image Overlay" width={400} height={512} hidden={true}/>
        <Image id='pixel3' className={pixel3Class} src={pixel3} alt="Image Overlay" width={400} height={512} hidden={true}/>
        <Image id='pixel4' className={pixel4Class} src={pixel4} alt="Image Overlay" width={400} height={512} hidden={true}/>
        <Image id='pixel5' className={pixel5Class} src={pixel5} alt="Image Overlay" width={400} height={512} hidden={true}/>
        <Image id='pixel6' className={pixel6Class} src={pixel6} alt="Image Overlay" width={400} height={512} hidden={true}/> 
        
        </div>
        <div className={styles.input}>
          <label>Whos The Star?</label>
          
          <input id='celebInput' placeholder='Type Celebrities Name Here'></input>
          <button onClick={() => onGuessSubmit()}>SUBMIT</button>
          <button onClick={() => skip()}>SKIP</button>
          <Share
          label="Share"
          title="Test"
          text="test"/>
          
        </div>

        <div className={styles.guess}>
          <span>{guess1}</span>
        </div>
        <div className={styles.guess}>
          <span>{guess2}</span>
        </div>
        <div className={styles.guess}>
          <span>{guess3}</span>
        </div>
        <div className={styles.guess}>
          <span>{guess4}</span>
        </div>
        <div className={styles.guess}>
          <span>{guess5}</span>
        </div>
        <div className={styles.guess}>
          <span>{guess6}</span>
        </div>
        
      </main>

    </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const imageData = getImageData();
  return {
    props: 

      imageData
    
      
    
  }
}
