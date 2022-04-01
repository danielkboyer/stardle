
import Image from 'next/image'
import React from 'react'
import styles from '../components/guess.module.css'

export default function Guess({
        guesses,
        guessFunction,
        onNumber
}:{
      guesses:string[],
      guessFunction:(celebName:string)=>void,
      onNumber:number
  
}){
  
 
  
  const onInputEnter = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    console.log(e);
    
    if(e.key == "Enter"){
      onGuessSubmit();
    }
  }

  const skip = () =>{
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    element.value = "SKIP";
    onGuessSubmit();
  };


  const onGuessSubmit = () => {

    //retrieve input data
    var element  = document.getElementById("celebInput");
    if(!(element instanceof HTMLInputElement))
      throw new Error('Expected element to be an HTMLScriptELement, was ${element && element.constructor && element.constructor.name || element}');
    var celebName = element.value;
    element.value = "";

    if(celebName == "")
      return;

    guessFunction(celebName);
   

  };
  return (
    <div className={styles.main}>

        <div className={styles.input}>
          <label>Who&apos;s The Star?</label>
          
          <input id='celebInput' onKeyDown={onInputEnter} placeholder='Type Celebrities Name Here'></input>
          <button onClick={() => onGuessSubmit()}>SUBMIT</button>
          <button onClick={() => skip()}>SKIP</button>
          
          
        </div>

        <div className={styles.guess}>
          <span>{guesses[0]}</span>
          { guesses[0] != "" && onNumber != 0 &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[1]}</span>
          { guesses[1] != "" && onNumber != 1 &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[2]}</span>
          { guesses[2] != "" && onNumber != 2 &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[3]}</span>
          { guesses[3] != "" && onNumber != 3 &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[4]}</span>
          { guesses[4] != "" && onNumber != 4 &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        <div className={styles.guess}>
          <span>{guesses[5]}</span>
          { guesses[5] != "" && onNumber != 5 &&
            <div className={styles.divIcon}>
            <Image src="/images/xmark.png" width={24} height={24}></Image>
            </div>
          }
        </div>
        </div>
  )
}
