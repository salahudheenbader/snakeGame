const canvas =document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasSize = 600;
canvas.width =canvasSize;
canvas.height =canvasSize;


const snakeBox =20;
const totalMoves = canvasSize/snakeBox;

const apple = new Image();
apple.src="Images/apple.png"


let dead= new Audio();
let eat = new Audio();
let up = new Audio();
let down =new Audio();
let left =new Audio();
let right =new Audio();

dead.src ="Audio/dead.mp3"
eat.src ="Audio/eat.mp3"
up.src ="Audio/up.mp3"
down.src ="Audio/down.mp3"
left.src ="Audio/left.mp3"
right.src ="Audio/right.mp3"

//defaine snake

let snake = [];
snake[0]={
    x : 9 * snakeBox,
    y : 10 * snakeBox
};

// create a food

let food = {};
getFood();

//schore

let score =0;
//snake direection

let dir ="";

document.addEventListener("keydown",direction);

function direction(){
    let key = Event.keyCode;
    if(key==37 && dir!="RIGHT"){
        dir ="LEFT";
        left.play;
    }else if(
        key==38 && dir!="DOWN"
    ){
        dir="UP"
        up.play;
    }else if(key==39 && dir!="LEFT"){
        dir="RIGHT"
        right.play;
    }
    else if(key==40 && dir!="UP"){
        dir="DOWN";
        down.play
    }

}

function getFood(){
    food ={
        x: Math.floor(Math .random()*(totalMoves-2-3)+3  )*snakeBox,
        y:Math.floor(Math .random()*(totalMoves-2-3)+3  )*snakeBox
    }
}

function collisionDetection(head,ar){
    for (i=0;i<ar.length;i++){
        if(ar[i].x == head.x && ar[i].y==head.y){
            return true;
        }
    }
    return false;
}

function render(){
    ctx.fillStyle ="#dcdcdc";
    ctx.fillRect(0,0,canvasSize,canvasSize)

for(i=0;i<snake.length;i++){
    ctx.fillStyle = i==0?"#4CAF50":"white";
    ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
    ctx.strokeStyle="#E91E63";
    ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
}

ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox);
let snakeX = snake[0].x;
let snakeY = snake[0].y;

if(dir == "LEFT") snakeX-=snakeBox;
if(dir == "RIGHT") snakeX+=snakeBox;
if(dir == "UP") snakeY-=snakeBox;
if(dir == "DOWN") snakeY+=snakeBox;


// IF EAT FOOD

if(snakeX==food.x && snakeY==food.y){
    score++
    eat.play();
    getFood;
}
else{
    snake.pop();
}

let newHead ={
    x : snakeX,
    y:  snakeY
};
if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || collisionDetection(newHead,snake)){
    gameOver();
    return;
}

snake.unshift(newHead)
ctx.fillStyle ="black";
ctx.font ="40px tahoma"
ctx.fillText(score,10,40)
}
render();

var gm = setInterval(render,100);

function gameOver(){
    clearInterval(gm);
    dead.play();
    ctx.fillStyle= "black";
    ctx.font = "40px tathoma"
    ctx.fillText("GameOver",canvasSize/2-100,canvasSize/2);
}









