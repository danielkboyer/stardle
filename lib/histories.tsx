
import fs from 'fs'
import path from 'path'
import { getDate, getOrignalDate, getStringDate } from './stars';

const dayDirectory = path.join(process.cwd(),'public')


export function getAllStardleIds() {

    const originalDate = getOrignalDate();
    const todaysDate = getDate(0,false);

    
    var dates: string[] = [];
    while(originalDate < todaysDate){
      dates.push(getStringDate(originalDate));
      originalDate.setUTCDate(originalDate.getUTCDate() + 1);
    }
    console.log("Date amount: "+dates.length);
    return dates.map(date => {
      return {
        params: {
          id: date
        }
      }
    })
  }


