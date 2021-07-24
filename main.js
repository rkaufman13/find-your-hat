const prompt = require('prompt-sync')({sigint: true});
const helpers = require('./helpers.js');
const getRandomNum = helpers.getRandomNum;
const isHat = helpers.isHat;
const isHole = helpers.isHole;
const checkWinConditions = helpers.checkWinConditions;
const checkDieConditions = helpers.checkDieConditions;

const hat = '^';
const hole = 'O';
const fieldCharacter = '-';
const pathCharacter = '*';

class field {
    constructor(width,length,numHoles){
        this._width = width;
        this._length = length;
        this._numHoles = numHoles;
    this._hatX = getRandomNum(width);
    this._hatY = getRandomNum(length);
    this._playerX = 0;
    this._playerY = 0;
    this._fieldArray = [];
    }

    get width (){
        return this._width;
    }
    get length (){
        return this._length;
    }

    get hatX (){
    return this._hatX;
}
get hatY (){
    return this._hatY;
}

get playerX(){
    return this._playerX;
}

get playerY(){
    return this._playerY;
}

set playerX(pos){
    this._playerX = pos;
}

set playerY(pos){
    this._playerY = pos;
}

get fieldArray(){
    return this._fieldArray;
}

    generateField(){  
         
    for (let i = 0; i < this._length; i++){
        let rowArray = [];
        for (let j = 0; j < this._width; j++){
            if (i === 0 && j === 0){
                rowArray.push(pathCharacter);
            }
            else if (j === this._hatX && i === this._hatY){
                
                rowArray.push(hat);
            }
            else {
           rowArray.push(fieldCharacter)
        }
        }
        this._fieldArray.push(rowArray);
        
}
//make the holes but argh i hate this
let holescount = 0;
while (holescount<this._numHoles){
    //console.log(holescount);
    const holeX = getRandomNum(this._width);
    const holeY = getRandomNum(this._length);
if (isHat(holeX,holeY,this._hatX,this._hatY) === false && !(holeX === 0 && holeY === 0)){
   
    if (isHole(holeX,holeY,this._fieldArray) === false){
        this._fieldArray[holeY].splice(holeX,1,hole);
        holescount++;
    }

}

}
}

print(){
    for (let i = 0; i <this._fieldArray.length;i++){
        console.log(this.fieldArray[i].join(''));
    }
}

updateField(){
    this._fieldArray[this._playerY].splice(this._playerX,1,pathCharacter);
}

}

const wid = prompt('How wide do you want your board to be? ');
const len = prompt('And how tall should it be? ');
let diffset = false;
let holes = Math.floor(wid*len/3);

while (diffset === false){
let diffchoice = prompt("Choose your difficulty setting: Easy | Medium | Hard ");
switch (diffchoice.toLowerCase()){
    case 'easy': 
        holes = Math.floor(wid*len/5);
        diffset = true;
        break;
    case 'medium':
        holes = Math.floor(wid*len/4);
        diffset = true;
        break;
     case 'hard':
        holes =Math.floor(wid*len/3);
        diffset = true;
        break;
    default:
        console.log("You must choose easy, medium, or hard. ")
        break;

}
}
const gameField = new field(wid, len, holes);

gameField.generateField();

gameField.print();

let foundhat = false;
let gameState = true;

while (!foundhat && gameState === true){
const input = prompt('Which way? Enter U, D, L, or R: ');
switch (input.toLowerCase()){
    case 'u':
        gameField.playerY = gameField.playerY-1;
        gameState = checkDieConditions(gameField);
        foundhat = checkWinConditions(gameField);
        gameField.updateField();
        gameField.print();
       break;
    case 'd':
        gameField.playerY = gameField.playerY+1;
        gameState = checkDieConditions(gameField);
        foundhat = checkWinConditions(gameField);
        gameField.updateField();
        gameField.print();
        break;
    case 'l':
        gameField.playerX=gameField.playerX-1;
        gameState = checkDieConditions(gameField);
        foundhat = checkWinConditions(gameField);
        gameField.updateField();
        gameField.print();
        break;
         
        gameField.print();
        break;
    case 'r':
        //do something
        gameField.playerX=gameField.playerX+1;
      gameState = checkDieConditions(gameField);
      foundhat = checkWinConditions(gameField);
        gameField.updateField();
        gameField.print();
        break;
    default: console.log ('You must enter U, D, L or R to go up, down, left or right.');
}

}

//hat found, you win
if (foundhat === true){
console.log("You found the hat, you win");
}