import exp from "constants";
import React from 'react'
import {useRouter} from 'next/router'
import styles from '../components/share.module.css'
import * as ga from '../lib/ga/index'
import {alertService} from '../services/alert.service';
import { Alert } from "./Alert";
function Share({ label, text, title }:
    {
        label:string,
        text:string,
        title:string
    }) {
    let url = "https://www.stardle.app";
    //console.log("url: "+url);
    const shareDetails = { url, title, text };
    
    const handleSharing = async () => {

      ga.event({
        action: "share",
        params : {
          title:title,
          text:text, 
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
      <div className={styles.center}>
        <Alert />
      <button className={styles.sharerButton} onClick={handleSharing}>
        <span className="sharer-button-text">{label}</span>
      </button>
      </div>
    )
  }

  export default Share;