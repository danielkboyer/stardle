
import Image from 'next/image'
import React, {useState,useEffect, KeyboardEventHandler} from 'react'
import styles from '../components/images.module.css'

export default function Images({
     
        pixels,
        guesses
       
}:{
        pixels:string[],
        guesses:string[]
      
  
}){
  

  return (
    

        <div className={styles.overlapGrid}>
        
        {
          guesses[0] == "" && 
          <Image id='pixel1' priority={true} src={pixels[0]} unoptimized alt="Star 1" width={400} height={512}/>
        }
        {
          guesses[1] == "" && guesses[0] != "" &&
          <Image id='pixel2' src={pixels[1]} alt="Star 2" unoptimized width={400} height={512} hidden={true}/>
        }
        {
          guesses[2] == "" && guesses[1] != "" &&
          <Image id='pixel3' src={pixels[2]} alt="Star 3" unoptimized width={400} height={512} hidden={true}/>
        }
        {
          guesses[3] == "" && guesses[2] != "" &&
          <Image id='pixel4' src={pixels[3]} alt="Star 4" unoptimized width={400} height={512} hidden={true}/>
        }
        {
          guesses[4] == "" && guesses[3] != "" &&
          <Image id='pixel5' src={pixels[4]} alt="Star 5" unoptimized width={400} height={512} hidden={true}/>
        }
        {
          guesses[5] == "" && guesses[4] != "" &&
          <Image id='pixel6' src={pixels[5]} alt="Star 6" unoptimized width={400} height={512} hidden={true}/> 
        }
        </div>
       
  )
}
