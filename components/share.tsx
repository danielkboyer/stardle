import exp from "constants";
import React from 'react'
import {useRouter} from 'next/router'
import styles from '../components/share.module.css'
function Share({ label, text, title }:
    {
        label:string,
        text:string,
        title:string
    }) {
    let url = useRouter().basePath;
    const shareDetails = { url, title, text };
  
    const handleSharing = async () => {
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
          "Web share is currently not supported on this browser. Please provide a callback"
        );
      }
    };
    return (
      <button className={styles.sharerButton} onClick={handleSharing}>
        <span className="sharer-button-text">{label}</span>
      </button>
    )
  }

  export default Share;