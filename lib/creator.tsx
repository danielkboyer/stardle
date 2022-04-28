import fs from 'fs'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import path from 'path'
const dayDirectory = path.join(process.cwd(),'public')

var AWS = require('aws-sdk')
AWS.config.update(
    {
      accessKeyId: ".. your key ..",
      secretAccessKey: ".. your secret key ..",
    }
  );
const s3 = AWS.s3();
export async function getNames(){
    const params = {Bucket:'stardlebucket',Key:'names.txt'};
    const response = await s3.getObject(params).promise();
    const fileContent = response.Body.toString('utf-8');
    
    return fileContent;
}
export function getStardleData(id:string) {

    var namesFile = getNames();
    console.log(namesFile);
    const dateObj = new Date();
    dateObj.setHours(dateObj.getHours() - 6);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var dateStr = year+""+month+""+day;
    var dayPath = "/images/"+year+month+day+"/";
    
    var numberPath = path.join(dayDirectory,dayPath+"number.txt");
    var number = parseInt(fs.readFileSync(numberPath,'utf-8'));
    console.log(`DateObj date ${dateObj.getUTCDate()} - (${number} - ${parseInt(id)})`);
  
    dateObj.setUTCDate(dateObj.getUTCDate() - (number-parseInt(id)));

    month = dateObj.getUTCMonth() + 1;
    day = dateObj.getUTCDate();
    year = dateObj.getUTCFullYear();
    
    dateStr = year+""+month+""+day;
    dayPath = "/images/"+year+month+day+"/";

    const starPath = dayPath+"star.jpg";
    const pixels = [dayPath+"1.jpg",dayPath+"2.jpg",dayPath+"3.jpg",dayPath+"4.jpg",dayPath+"5.jpg",dayPath+"6.jpg"];
   
    const fullPath = path.join(dayDirectory,dayPath+"name.txt");
    numberPath = path.join(dayDirectory,dayPath+"number.txt");
    console.log(fullPath);
    const starName = fs.readFileSync(fullPath,'utf-8');
    const names = starName.split(/\r?\n/);


    return {
      
        starPath:starPath,
        pixels:pixels,
        names:names,
        dateStr:dateStr,
        stardleNumber:id,
        originalNumber:number

      
      
    }
  }