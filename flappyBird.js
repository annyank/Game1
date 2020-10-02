let cvs = document.getElementById("canvas");//создаемканвас
let ctx = cvs.getContext("2d"); //параметр рисования, контекст 2д
cvs.width = 288;//ширина и высота канваса, ниже кривая функця адаптации под телефоны,все что она делает- выколючает игра на телефоне,утром напишу нормальную.
cvs.height=512;
/*
if(document.body.clientWidth>1000){
  cvs.width = 288;
  cvs.height=512;
}
else {
  cvs.width =0;
  cvs.height=0;
}
*/


//создаем переменные для картинок
const bird = new Image();
const background = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();
//создаем ссылки для картинок
bird.src = "images/bird.png";
background.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

const gap = 95;//расстояние между трубами
let constant; //константа, расстояние от вернего края до конца верхней трубы + gap

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

const fly = new Audio();
const scorSound = new Audio();

fly.src = "sounds/fly.mp3";
scorSound.src = "sounds/score.mp3";

document.addEventListener("keydown",moveUp);//проверка нажатия



document.addEventListener("touchstart",moveUp, false); // добавиил ивент на тач, touchstart - происходит событие при условии касания экрана,более подробно - https://developer.mozilla.org/ru/docs/Web/API/Touch_events

//width="288" height="512"

function moveUp(){//подъем птицы
    bY -= 25;
    fly.play();
}

// координаты труб

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


function draw(){
    ctx.drawImage(background,0,0);//рисуем фон

    for(var i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;//движение труб на птичку
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }
        // конец игры
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        if(pipe[i].x == 5){
            score++;
            scorSound.play();
        }
    }
    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,bX,bY);
    bY += gravity;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    requestAnimationFrame(draw);//рекурсия

}

draw();
