
import React, {useState,useEffect} from 'react'
import Layout from '../components/layout'
import { CookieValueTypes } from 'cookies-next/lib/types'
import Styles from '../styles/Finished.module.css'
import { GetStaticProps } from 'next';
import Share from '../components/share'
import Image from 'next/image'
import * as ga from '../lib/ga/index'
import {useRouter, withRouter} from 'next/router'
import {FacebookShareButton,FacebookIcon, RedditIcon, TwitterIcon} from 'next-share'
import Link from 'next/link';
import { getShareMessage } from '../lib/share';
import { getDate, getNumber } from '../lib/stars';
import {alertService} from '../services/alert.service';
import { Alert } from '../components/Alert';
function isBool(cookie: CookieValueTypes):cookie is boolean{
  return (cookie as boolean) !== undefined;
}
function isString(cookie: CookieValueTypes):cookie is string{
  return (cookie as string) !== undefined;
}

function Finished({
 
}){

    const router = useRouter();

    const starName = router.query.starName as string[] | null;
    var guesses = router.query.guesses as string[] | null;
    if(guesses == null){
        guesses = ["","","","","",""];
    }
    const stardleNumber = router.query.stardleNumber as string;
    const prevNumber = (parseInt(stardleNumber) - 1).toString();
    const yesterday = getDate(1,true) as string;
    console.log(starName);
    const starPath = router.query.starPath as string;
    const won = (router.query.won as string) == "true";
    console.log(won)
    const number = Number(router.query.guessNumber as string);
    console.log(number);
   
        var mtDate = new Date();
        mtDate.setUTCHours(mtDate.getUTCHours()-6);
        mtDate.setUTCDate(mtDate.getUTCDate()+1);
        mtDate.setUTCHours(0);
        mtDate.setUTCMinutes(0);
        mtDate.setUTCSeconds(0);
        var countDownDate = mtDate.getTime();
        console.log("COUNT DOWN DATE "+mtDate.toUTCString());

    const setTime = (data:string) =>{
        if(document == null){
            return;
        }

        var timer = document.getElementById("myTimer");
        if(timer == null){
            clearInterval(interval);
            return;
        }

        timer.innerHTML = data;
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
    function playMore(){
        clearInterval(interval);
        ga.event({
            action: "play_prev_"+prevNumber,
            params : {
            }
          })
    }

    function newGameIdea(){

        var input = document.getElementById("ideaInput");
        if(!(input instanceof HTMLInputElement)){
          throw new Error(`Expected element to be an HTMLScriptELement, was ${input && input.constructor && input.constructor.name || input}`);
          return;
        }
  
        
        var idea = input.value;
        if(idea === "" || idea === null)
            return;
        ga.event({
            action: "game_idea",
            params : {
                idea:idea
            }
          });

          input.value = "";

          navigator.clipboard.writeText(idea).then(()=>{
            alertService.success("Idea submitted, thanks!",{fade:3});
          }).catch(()=>{
            alertService.error("Something went wrong",{fade:3});
          });
    }
    const interval = setInterval(() => {

        var now = new Date();
        now.setUTCHours(now.getUTCHours()-6);

        
        // Find the distance between now and the count down date
        var distance = countDownDate - now.getTime();
        
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
              <div className={Styles.name}>{starName}</div>
              {won == true &&
                  <div className={Styles.desc}>You Won! You Smart!</div>
              }
              {won == false &&
                  <div className={Styles.desc}>You didn&apos;t get todays Stardle... Try again tommorow.</div>
              }
              <div>
                  <Link href={`/stardles/${yesterday}`}>
                      <a onClick={playMore} className={Styles.wantMore}>{"Want more? Play Yesterdays Stardle"}</a>
                  </Link>
              </div>
              <Share
                  number={number}
                  guesses={guesses}
                  won={won}
                  stardleNumber={stardleNumber}
              />



              {/* <div>
        <Link  href={`/stardles/${yesterday}`}>
            <a onClick={playMore} className={Styles.newStardle}>
                <div>
                    Try <span>NEW</span> NBA Stardle
                </div>
            </a>
        </Link>

        </div> */}
              <div className={Styles.input}>
                  <div>
                      Want different categories of stardle? Write a category below to be created (e.g NBA, Soccer, GEN Z, Political, UK).
                  </div>
                  <input id="ideaInput"></input>
                  <button onClick={newGameIdea}>Submit</button>
                  <Alert />
              </div>
              <div className={Styles.timer}>
                  <span>Next Stardle</span>
                  <div id='myTimer'>
                      12:00:00
                  </div>
              </div>


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