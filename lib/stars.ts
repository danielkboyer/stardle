import fs from 'fs'
import path from 'path'
const dayDirectory = path.join(process.cwd(),'public')



export function getStarData(){
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const dayPath = "/images/"+year+month+day+"/";
    const starPath = dayPath+"star.jpg";
    const fullPath = path.join(dayDirectory,dayPath+"name.txt");
    const starName = fs.readFileSync(fullPath,'utf-8');
    
    return {
      
        starPath:starPath,
     
        name:starName,
      
      
      
    }
}
export function getImageData(){
    const dateObj = new Date();
    dateObj.setHours(dateObj.getHours() - 6);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const dateStr = year+""+month+""+day;
    const dayPath = "/images/"+year+month+day+"/";
    const starPath = dayPath+"star.jpg";
    const pixel1 = dayPath+"1.jpg";
    const pixel2 = dayPath+"2.jpg";
    const pixel3 = dayPath+"3.jpg";
    const pixel4 = dayPath+"4.jpg";
    const pixel5 = dayPath+"5.jpg";
    const pixel6 = dayPath+"6.jpg";
    const fullPath = path.join(dayDirectory,dayPath+"name.txt");
    const numberPath = path.join(dayDirectory,dayPath+"number.txt");
    const starName = fs.readFileSync(fullPath,'utf-8');
    const number = fs.readFileSync(numberPath,'utf-8');
    const names = starName.split(/\r?\n/);
    
    return {
      
        starPath:starPath,
        pixel1:pixel1,
        pixel2:pixel2,
        pixel3:pixel3,
        pixel4:pixel4,
        pixel5:pixel5,
        pixel6:pixel6,
        names:names,
        dateStr:dateStr,
        stardleNumber:number

      
      
    }
}
