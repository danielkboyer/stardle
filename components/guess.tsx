
import Image from 'next/image'
import React, { CSSProperties, useState } from 'react'
import styles from '../components/guess.module.css'
import Select, { StylesConfig } from "react-select";
import { string } from 'prop-types';
export default function Guess({
        guesses,
        guessFunction,
        onNumber,
        options,
        pushFunction,
        skipFunction,
}:{
      guesses:string[],
      guessFunction:(celebName:string)=>void,
      onNumber:number,
      options: string[],
      pushFunction:((password:string)=>void) | undefined,
      skipFunction:((password:string)=>void) | undefined,
  
}){
  
  const[password,setPassword] = useState("");
  const[menuOpen,setMenuOpen] = useState(false);
  const[selectedOption,setSelectedOption] = useState({value:"",label:""});
  // const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
  //   console.log(e);
    
  //   if(e.key == "Enter"){
  //     onGuessSubmit();
  //   }
  // }

  const onInputChange = (newValue: string) =>{
    console.log(newValue);
    if(newValue === "" || newValue === undefined){
        setMenuOpen(false)
        setSelectedOption({value:"",label:""})
    }
    else{
      setMenuOpen(true);
      setSelectedOption({value:newValue,label:newValue})
    }
  }


  const onSelectChange = (e:string|undefined)=>{
    if(e === undefined)
      return;
    console.log("did it"+e);
    setSelectedOption({value:e,label:e})
  }
  const skip = () =>{
   
    onGuessSubmit(true);
  };


  const onGuessSubmit = (skip:boolean = false) => {

    //retrieve input data
    if(!skip){
      var dropdown = document.getElementById("celebInput");
      if(!(dropdown instanceof HTMLDivElement)){
        throw new Error(`Expected element to be an HTMLScriptELement, was ${dropdown && dropdown.constructor && dropdown.constructor.name || dropdown}`);
        return;
      }

      
      var celebName = dropdown.innerText;
    }
    else{
      var celebName = "SKIP";
    }
    console.log(celebName)
    if(celebName == "")
      return;

    guessFunction(celebName);
    
    setSelectedOption({value:"",label:""});

  };
  type option_class = {
    value:string;
    label:string;
  }
  var options_c : option_class[] = [];
  for(let x = 0;x<options.length;x++){
    options_c.push({value:options[x],label:options[x]});
  }
  const customControlStyles: CSSProperties = {
    color: "red",
    borderColor: "pink",
    width:"10rem"

  };
  
  const customSelectStyles : StylesConfig<option_class,false> = {
    control:(provided,state) => {

      return {
        ...provided,
        ...customControlStyles
      }
    }
  }

  const pushWrapper = () =>{
    if(pushFunction == undefined)
      return;
    const input = document.getElementById("passwordInput") as HTMLInputElement;
    pushFunction(input.value);
  }
  const skipWrapper = () =>{
    if(skipFunction == undefined)
      return;
    const input = document.getElementById("passwordInput") as HTMLInputElement;
    skipFunction(input.value);
  }
  return (
    <div className={styles.main}>
      <div className={styles.creation}>
        {
          <input id='passwordInput' ></input>
        }
        {
          pushFunction !== undefined &&
          <button onClick={()=>pushWrapper()}>PUSH</button>
          
        }
        {
          skipFunction !== undefined &&
          <button onClick={()=>skipWrapper()}>SKIP</button>
        }
        </div>
        <label className={styles.label}>Who&apos;s The Star?</label>
        
        <div className={styles.input}>
          
          
          <Select id="celebInput"  onChange={(e)=>{
            onSelectChange(e?.label);
          }} className={styles.select} styles={customSelectStyles}  options={options_c} onInputChange={onInputChange} menuIsOpen={menuOpen} placeholder="Type Here" components={{
            
            DropdownIndicator:()=>null,
            IndicatorSeparator:()=>null,
          }} />
          
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
