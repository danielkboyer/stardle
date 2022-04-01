
import React, {useState,useEffect} from 'react'
import Layout from '../components/layout'
import { CookieValueTypes } from 'cookies-next/lib/types'
import Styles from '../styles/Finished.module.css'
import { GetStaticProps } from 'next';
import Share from '../components/share'
import Image from 'next/image'
import * as ga from '../lib/ga/index'
import { getImageData, getStarData } from '../lib/stars';
import {useRouter, withRouter} from 'next/router'
import {FacebookShareButton,FacebookIcon, RedditIcon, TwitterIcon} from 'next-share'
import Link from 'next/link';
import { getShareMessage } from '../lib/share';
function isBool(cookie: CookieValueTypes):cookie is boolean{
  return (cookie as boolean) !== undefined;
}
function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
}

function Finished({
 
}){

    const router = useRouter();

    const names = router.query.names as string[] | null;
    var guesses = router.query.guesses as string[] | null;
    if(guesses == null){
        guesses = ["","","","","",""];
    }
    const stardleNumber = router.query.stardleNumber as string;
    const prevNumber = (parseInt(stardleNumber) - 1).toString();
    console.log(names);
    const starPath = router.query.starPath as string;
    const won = (router.query.won as string) == "true";
    console.log(won)
    const number = Number(router.query.guessNumber as string);
    console.log(number);
   
        var mtDate = new Date();
        mtDate.setHours(mtDate.getUTCHours()-6);
        mtDate.setDate(mtDate.getUTCDate()+1);
        mtDate.setHours(0);
        mtDate.setMinutes(0);
        mtDate.setSeconds(0);
        var countDownDate = mtDate.getTime();

    const setTime = (data:string) =>{
        if(document == null){
            return;
        }

        document.getElementById("myTimer")!.innerHTML = data
    }

    const clickTwitter = () =>{
        ga.event({
            action: "twitter",
            params : {
            }
          })
    }

    const clickInstagram = () =>{
        ga.event({
            action: "instagram",
            params : {
            }
          })
    }

    const interval = setInterval(() => {

        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        
        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if(distance < 0){
            setTime("00:00:00");
            clearInterval(interval);
        }
        else{
            setTime((hours < 10?"0"+hours:hours)+":"+(minutes < 10?"0"+minutes:minutes)+":"+(seconds < 10?"0"+seconds:seconds));
        }
    }, 1000);
         

  return (
    
    
    <Layout>
        <div className={Styles.container}>
        <Image src={starPath} width={400} height={512}></Image>
        <div className={Styles.name}>{names != null && names[0]}</div>
        {won == true &&
            <div className={Styles.desc}>You Won! You Smart!</div>
        }
        {won == false &&
            <div className={Styles.desc}>You didn&apos;t get todays Stardle... Try again tommorow.</div>
        }
        
        <Link href={`/stardles/${prevNumber}`}>
            <a>{"Want more? Play Yesterdays Stardle"}</a>
        </Link>
        <div className={Styles.timer}>
            <span>Next Stardle</span>
            <div id='myTimer'>
                12:00:00
            </div>
        </div>
        <Share
          number={number}
          guesses={guesses}
          won={won}
          stardleNumber={stardleNumber}
          />
        </div>
{/* 
        <div className={Styles.followMe}>
            Follow me and share your results, or suggest ideas.
        </div>

        <div className={Styles.socials}>
          
            <a
            onClick={clickInstagram}
            href={"https://www.instagram.com/stardle.app/?hl=en"}
            >
                <Image src={"/icons8-instagram-48.png"} width={32} height={32}/>
            </a>

            <a
            onClick={clickTwitter}
            href={"https://twitter.com/Stardle_app"}
            >
                <TwitterIcon size={32}/>
            </a>
        </div> */}
    </Layout>
  )
}

export default Finished

// export const getStaticProps: GetStaticProps = async () => {
  

//     const imageData = getStarData();
//     return {
//       props: 
  
//         imageData
      
        
      
//     }
//   }