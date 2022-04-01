

export function getShareMessage(number:number,guesses:string[],won:boolean,stardleNumber:string){
    var shareMessage = "#Stardle "+stardleNumber+"\n";
    shareMessage += won?"✅":"❌";
    for(var x = 0;x<6;x++){
        if(number == x+1){
            shareMessage+="🟩";
        }
        else if(guesses[x] == ""){
            shareMessage+="⬜️";
        }
        else if(guesses[x] == "SKIP"){
            shareMessage+="⬛️";
        }
        else{
            shareMessage+="🟥";
        }
    }

    return shareMessage;
}