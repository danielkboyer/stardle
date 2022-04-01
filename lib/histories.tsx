
import {getImageData} from '../lib/stars'
import fs from 'fs'
import path from 'path'

const dayDirectory = path.join(process.cwd(),'public')


export function getAllStardleIds() {

    const imageData = getImageData();
    
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    var numbers = [];
    for(var x = 1;x<= parseInt(imageData.stardleNumber);x++){
      numbers.push(x);
    }
    return numbers.map(number => {
      return {
        params: {
          id: number.toString()
        }
      }
    })
  }


  export function getStardleData(id:string) {

    const dateObj = new Date();
    dateObj.setHours(dateObj.getHours() - 6);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var dateStr = year+""+month+""+day;
    var dayPath = "/images/"+year+month+day+"/";
    
    var numberPath = path.join(dayDirectory,dayPath+"number.txt");
    var number = parseInt(fs.readFileSync(numberPath,'utf-8'));

    dateObj.setDate(dateObj.getUTCDate() - (number-parseInt(id)));

    day = dateObj.getUTCDate();
    year = dateObj.getUTCFullYear();
    dateStr = year+""+month+""+day;
    dayPath = "/images/"+year+month+day+"/";

    const starPath = dayPath+"star.jpg";
    const pixels = [dayPath+"1.jpg",dayPath+"2.jpg",dayPath+"3.jpg",dayPath+"4.jpg",dayPath+"5.jpg",dayPath+"6.jpg"];
   
    const fullPath = path.join(dayDirectory,dayPath+"name.txt");
    numberPath = path.join(dayDirectory,dayPath+"number.txt");
    const starName = fs.readFileSync(fullPath,'utf-8');
    const names = starName.split(/\r?\n/);


    return {
      
        starPath:starPath,
        pixels:pixels,
        names:names,
        dateStr:dateStr,
        stardleNumber:id

      
      
    }
  }