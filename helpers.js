const getRandomNum = (num) =>{
return Math.floor(Math.random()*num);
}

const isHat = (x,y,hatX,hatY)=>{
    
    if (x === hatX && y === hatY){
    
        return true;
}
else {
    
    return false;
}
}

const isHole = (x,y,field)=>{
    
if (field[y][x] === 'O'){
    
        return true;
    }
    else {
        return false
    }
    
}

const checkDieConditions = (gameField) => {
   if (gameField.playerX < 0 || gameField.playerX >gameField.width-1 || gameField.playerY <0 || gameField.playerY > gameField.length-1){
        console.log("You fell off the edge of the map, you lose");
return false;    
    }
    else if (gameField.fieldArray[gameField.playerY][gameField.playerX] === 'O'){
        console.log("You died in a pit, you lose");
      return false;
    }
else {return true;}
}

const checkWinConditions = (gameField) => {
    if (isHat(gameField.playerX,gameField.playerY,gameField.hatX,gameField.hatY)===true){
        return true;    
     }
     else {return false;}
}

module.exports = {getRandomNum, isHat, isHole, checkWinConditions, checkDieConditions};