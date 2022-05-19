import fs from 'fs'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import path from 'path'
const dayDirectory = path.join(process.cwd(),'public')

var AWS = require('aws-sdk')
AWS.config.update(
    {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_PASS,
    }
  );
const s3 = new AWS.S3();
export async function getNames():Promise<string>{
    const params = {Bucket:'stardlebucket',Key:'names.txt'};
    const response = await s3.getObject(params).promise();
    const fileContent = response.Body.toString('utf-8');
    
    return fileContent;
}

export async function getRandomStar():Promise<{index:string,name:string,names:string[]} | undefined>{
  let names = (await getNames()).split('\n');
  let toChoose = [];

  let maxCount = 10;
  for(let x = 0;x<names.length;x++){
    if(names[x][0] === '1'){
      continue;
    }
    if(names[x][2] === '0'){
      continue;
    }
    
    if(toChoose.length >= maxCount){
      continue;
    }
    console.log(`Pushing ${names[x]}`)
    toChoose.push(names[x].trim());
  }
  for(let x = 0;x<names.length;x++){
    names[x] = names[x].substring(6);
  }

  let randomInt = Math.floor(Math.random() * toChoose.length);
  console.log(`Returning: ${toChoose[randomInt]}`);
  return {
    index:toChoose[randomInt][4],
    name:toChoose[randomInt].substring(6),
    names:names,
  }
}





export async function getStardleData() {

    var randomStar = await getRandomStar();
    console.log(`Random star: ${randomStar?.name}`);
    if(randomStar === undefined){
      console.log("Could not retrieve random star, this should never happen");
      return {
        starPath:"",
        pixels:[],
        names:["FAILED"]
      }
    }
   
    let pixels = [];


    const fileName = `${randomStar.name}/${randomStar.index}/star.jpg`;
    //five minute url, this is okay because only I will be using this.
    const signedUrlExpireSeconds = 60* 60 *1;
    const starPath = await s3.getSignedUrl('getObject',{
      Bucket: "stardlebucket",
      Key:fileName,
      Expires:signedUrlExpireSeconds
    });

    for(let x = 1;x<7;x++){
      const fileName = `${randomStar.name}/${randomStar.index}/${x}.jpg`;
      const signedUrlExpireSeconds = 60* 60 *1;
      const url = await s3.getSignedUrl('getObject',{
        Bucket: "stardlebucket",
        Key:fileName,
        Expires:signedUrlExpireSeconds
      });
      pixels.push(url);
    }


    return {
      
        starPath:starPath,
        pixels:pixels,
        starName:randomStar.name,
        names:randomStar.names,
        starIndex:randomStar.index,



      
      
    }
  }