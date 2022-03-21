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
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const dayPath = "/images/"+year+month+day+"/";
    const starPath = dayPath+"star.jpg";
    const pixel1 = dayPath+"1.png";
    const pixel2 = dayPath+"2.png";
    const pixel3 = dayPath+"3.png";
    const pixel4 = dayPath+"4.png";
    const pixel5 = dayPath+"5.png";
    const pixel6 = dayPath+"6.png";
    const fullPath = path.join(dayDirectory,dayPath+"name.txt");
    const starName = fs.readFileSync(fullPath,'utf-8');
    
    return {
      
        starPath:starPath,
        pixel1:pixel1,
        pixel2:pixel2,
        pixel3:pixel3,
        pixel4:pixel4,
        pixel5:pixel5,
        pixel6:pixel6,
        name:starName,
      
      
      
    }
}
