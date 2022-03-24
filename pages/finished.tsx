
import React, {useState,useEffect} from 'react'
import Layout from '../components/layout'
import { CookieValueTypes } from 'cookies-next/lib/types'
import Styles from '../styles/Finished.module.css'
import { GetStaticProps } from 'next';
import Share from '../components/share'
import Image from 'next/image'
import { getImageData, getStarData } from '../lib/stars';
import {useRouter, withRouter} from 'next/router'
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
    console.log(names);
    const starPath = router.query.starPath as string;
    const won = (router.query.won as string) == "true";
    console.log(won)
    const number = Number(router.query.guessNumber as string);

    console.log(number);
    var div1Style = Styles.gray;
    var div2Style = Styles.gray;
    var div3Style = Styles.gray;
    var div4Style = Styles.gray;
    var div5Style = Styles.gray;
    var div6Style = Styles.gray;

    var shareMessage = "#Stardle "+stardleNumber+"\n";
    shareMessage += won?"✅":"❌";
    for(var x = 0;x<6;x++){
        if(number == x+1){
            shareMessage+="🟩";
        }
        else if(guesses[x] == ""){
            shareMessage+="⬜️";
        }
        else if(guesses[x] == "SKIP"){
            shareMessage+="⬛️";
        }
        else{
            shareMessage+="🟥";
        }
    }

    console.log(shareMessage);

    switch (number){
        case 1:
            div1Style = Styles.green;
            break;
        case 2:
            div1Style = Styles.yellow;
            div2Style = Styles.green;
            break;
        case 3:
            div1Style = Styles.yellow;
            div2Style = Styles.yellow;
            div3Style = Styles.green;
            break;
        case 4:
            div1Style = Styles.yellow;
            div2Style = Styles.yellow;
            div3Style = Styles.yellow;
            div4Style = Styles.green;
            break;
        case 5:
            div1Style = Styles.yellow;
            div2Style = Styles.yellow;
            div3Style = Styles.yellow;
            div4Style = Styles.yellow;
            div5Style = Styles.green;
            break;
        case 6:
            div1Style = Styles.yellow;
            div2Style = Styles.yellow;
            div3Style = Styles.yellow;
            div4Style = Styles.yellow;
            div5Style = Styles.yellow;
            div6Style = Styles.green;
            break;
        default:
            break;
        }


  return (
    
    
    <Layout>
        <div className={Styles.main}>
        <Image src={starPath} width={400} height={512}></Image>
        <div className={Styles.name}>{names != null && names[0]}</div>
        {won == true &&
            <div className={Styles.name}>You Won! You Smart!</div>
        }
        {won == false &&
            <div className={Styles.name}>You didn&apos;t get todays Stardle...I hope you get smarter.</div>
        }
        
        <div className={Styles.dashDiv}>
            <div className={Styles.dash+" "+ div1Style}></div>
            <div className={Styles.dash+" "+ div2Style}></div>
            <div className={Styles.dash+" "+ div3Style}></div>
            <div className={Styles.dash+" "+ div4Style}></div>
            <div className={Styles.dash+" "+ div5Style}></div>
            <div className={Styles.dash+" "+ div6Style}></div>
        </div>

        <Share
          label="SHARE"
          title={shareMessage}
          text={shareMessage}
          />
        </div>
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