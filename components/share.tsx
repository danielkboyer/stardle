import exp from "constants";
import React from 'react'
import {useRouter} from 'next/router'
import styles from '../components/share.module.css'
import * as ga from '../lib/ga/index'
import {alertService} from '../services/alert.service';
import { Alert } from "./Alert";
import { getShareMessage } from "../lib/share";
function Share({ number, guesses, won,stardleNumber }:
    {
      number:number,
      guesses:string[],
      won:boolean,
      stardleNumber:string
    }) {
    
    const router = useRouter();
    var shareMessage = getShareMessage(number,guesses,won,stardleNumber);
    let url = router.asPath;
    //console.log("url: "+url);
    const shareDetails = { url, title:shareMessage, text:shareMessage };
    
    var div1Style = styles.gray;
    var div2Style = styles.gray;
    var div3Style = styles.gray;
    var div4Style = styles.gray;
    var div5Style = styles.gray;
    var div6Style = styles.gray;
    switch (number){
      case 1:
          div1Style = styles.green;
          break;
      case 2:
          div1Style = styles.yellow;
          div2Style = styles.green;
          break;
      case 3:
          div1Style = styles.yellow;
          div2Style = styles.yellow;
          div3Style = styles.green;
          break;
      case 4:
          div1Style = styles.yellow;
          div2Style = styles.yellow;
          div3Style = styles.yellow;
          div4Style = styles.green;
          break;
      case 5:
          div1Style = styles.yellow;
          div2Style = styles.yellow;
          div3Style = styles.yellow;
          div4Style = styles.yellow;
          div5Style = styles.green;
          break;
      case 6:
          div1Style = styles.yellow;
          div2Style = styles.yellow;
          div3Style = styles.yellow;
          div4Style = styles.yellow;
          div5Style = styles.yellow;
          div6Style = styles.green;
          break;
      default:
          break;
      }
    const handleSharing = async () => {

      ga.event({
        action: "share_"+stardleNumber,
        params : {
          title:shareMessage,
          text:shareMessage, 
        }
      })
     
      if (navigator.share) {
        try {
          await navigator
            .share(shareDetails)
            .then(() =>
              console.log("Hooray! Your content was shared to tha world")
            );
        } catch (error) {
          console.log(`Oops! I couldn't share to the world because: ${error}`);
        }
      } else {
        // fallback code
        console.log(
          "Web share is currently not supported on this browser. Copying to clipboard"
        );

        navigator.clipboard.writeText(shareDetails.text+"\n"+url).then(()=>{
          alertService.success("Copied to clipboard",{fade:3});
        }).catch(()=>{
          alertService.error("Unable to copy to clipboard",{fade:3});
        });
        
       
      }
    };
    return (
      <div>
      <div className={styles.dashDiv}>
      <div className={styles.dash+" "+ div1Style}></div>
      <div className={styles.dash+" "+ div2Style}></div>
      <div className={styles.dash+" "+ div3Style}></div>
      <div className={styles.dash+" "+ div4Style}></div>
      <div className={styles.dash+" "+ div5Style}></div>
      <div className={styles.dash+" "+ div6Style}></div>
      </div>

      <div className={styles.center}>
        <Alert />
      <button className={styles.sharerButton} onClick={handleSharing}>
        <span className="sharer-button-text">{'SHARE'}</span>
      </button>
      </div>
      </div>
    )
  }

  export default Share;