import fs from 'fs'
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


export async function getNames(){
    const params = {Bucket:'stardlebucket',Key:'names.txt'};
    const response = await s3.getObject(params).promise();
    const fileContent:string[] = response.Body.toString('utf-8').split('\n');
    for(let x = 0;x<fileContent.length;x++){
        fileContent[x] = fileContent[x].substring(6);
    }
    
    return fileContent;
}

export function getStringDate(date:Date){

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth()+1;
    let monthStr = month.toString();
    if(month.toString().length === 1){
        monthStr = '0'+month;
    }
    const day = date.getUTCDate();
    let dayStr = day.toString();
    if(dayStr.length === 1){
        dayStr = '0'+dayStr;
    }

    return `${year}${monthStr}${dayStr}`;
    
}

export function getDate(daysBehind:number = 0,inStringFormat:boolean = true):Date | string{
    var mtDate = new Date();
    mtDate.setUTCHours(mtDate.getUTCHours()-6);
    mtDate.setUTCDate(mtDate.getUTCDate() - daysBehind);
   

    if(inStringFormat){
        return getStringDate(mtDate);
    }

    return mtDate;

}
export function getOrignalDate():Date{
    return new Date(Date.UTC(2022, 2, 20));
}
export function getNumber(date:Date):number{
    
    const firstDate = getOrignalDate();
    console.log(`Comparing ${date} to ${firstDate}`);
    // To calculate the time difference of two dates
    var Difference_In_Time = date.getTime() - firstDate.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days;
}

export async function getName(date:string){
    const params = {Bucket:'stardlebucket',Key:`images/${date}/name.txt`};
    const response = await s3.getObject(params).promise();
    const fileContent:string[] = response.Body.toString('utf-8').split('\n');
    return fileContent[0];
}
export async function getStardleData(date:string, minutes:number){
    try{
    console.log("retrieving stardle data for date: "+date);
    const fileName = `images/${date}/star.jpg`;
    const starName = await getName(date);
    const signedUrlExpireSeconds = minutes* 60 *1;
    const starPath = await s3.getSignedUrl('getObject',{
      Bucket: "stardlebucket",
      Key:fileName,
      Expires:signedUrlExpireSeconds
    });

    const pixels = []
    for(let x = 1;x<7;x++){
      const fileName = `images/${date}/${x}.jpg`;
      const signedUrlExpireSeconds = minutes * 60 *1;
      const url = await s3.getSignedUrl('getObject',{
        Bucket: "stardlebucket",
        Key:fileName,
        Expires:signedUrlExpireSeconds
      });
      pixels.push(url);
    }


    //get stardlenumber
    const stardleNumber = getNumber(new Date(Date.UTC(parseInt(date.substring(0,4)),parseInt(date.substring(4,6))-1,parseInt(date.substring(6,8)))));
    if(stardleNumber === NaN || starPath === undefined || starName === undefined || pixels === undefined || pixels === null || starPath === null){
        console.log(`ERROR: Something went wrong generating stardle data from date ${date}`);
    }

    return {
        starName:starName,
        starPath:starPath,
        pixels:pixels,
        stardleNumber:stardleNumber,
        names:(await getNames()),
    };
}catch(e){
    throw (`ERROR: Something went wrong generating date: ${date} ${e} `);
}
    


}
