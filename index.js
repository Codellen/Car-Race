const scoreCard = document.querySelector('.score');
const gameArea= document.querySelector('.game');
const start = document.querySelector('.start');
const getScore = document.getElementById('scorecard')

let score = 0;
let carPosition={
    x:0,
    y:0,
    speed:5
};
//below will take player action on keys, initiaal user has not enable therm
let player={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false,
};

let permissionStart = {}

//create function which moves dashed lines 

function dashMotion(){
    const getDash = document.querySelectorAll('.dash');
    getDash.forEach(function(ele){
        var top = ele.offsetTop; //this track line distance from top
        //const lineTopDetails = gameArea.getBoundingClientRect() //this give dimension of game area 
        if(top > 700) 
        { 
            //if any line goes more distance than bottom then set dash = 0 dist
            top = 0;
        }
        
            //update top values
            ele.style.top = top +6+'px';
        
        
    })
}
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom-25 < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right-45 < bRect.left) || (aRect.left+50 > bRect.right))
}
 function enemyMotion(carCss){
    const getEnemy = document.querySelectorAll('.enemy');

    getEnemy.forEach(function(enemy){
        if (isCollide(carCss, enemy)) {
            console.log("HIT");
            endGame();
        }

        var top = enemy.offsetTop;
       
        if(top > 1000) 
        { 
            const gameAreaDim = gameArea.getBoundingClientRect()
 
             let yTop = gameAreaDim.height - 200;
             let xRight = gameAreaDim.width - 100;
            //enemy.style.top = Math.floor(Math.random()*yTop)+'px';
            enemy.style.left = Math.floor(Math.random()*xRight)-5+'px';
            top = 0;
 
        }
        
            //update top values
            enemy.style.top = top +6+'px';
    })
 }

 function endGame() {
    permissionStart.start = false;
    player.ArrowUp = false,
    player.ArrowDown = false,
    player.ArrowRight = false,
    player.ArrowLeft = false,

    start.classList.remove("hide"); 
    start.innerHTML = "Game Over 🏃 <br>Score was " + score +"<br>Press here to Restart Game";
    start.classList.add('restart');
    score = 0;

}






function getAnimation(event){
    const carCss = document.querySelector('.background-car')
    dashMotion()
    enemyMotion(carCss)
    
    //now we are facing that car is going out of box area of game
    const boxValues = gameArea.getBoundingClientRect()
    if(permissionStart.start)
    {
// from this method we can access all the dimension of game area
if(player.ArrowUp &&  carPosition.y > boxValues.top-100){  // and condn confirm that decrease carpost (move up) when car post within box from top
    //when user click on arrow up we need to decrease top distance value to car go up
    carPosition.y = carPosition.y - carPosition.speed;
    
    }
    
    if(player.ArrowDown && carPosition.y < boxValues.bottom-300) 
    {
        carPosition.y = carPosition.y + carPosition.speed;
    }
    
    if(player.ArrowLeft && carPosition.x > -30){
        carPosition.x = carPosition.x -carPosition.speed;
    }
    
    if(player.ArrowRight && carPosition.x < boxValues.right-650){
        carPosition.x = carPosition.x + carPosition.speed;
    }
    
    
    
//after confirming what key is press now time to add css
carCss.style.top = carPosition.y +'px';
carCss.style.left = carPosition.x +'px';

score++;
        getScore.innerHTML = score;


    //we can create animation loop
    window.requestAnimationFrame(getAnimation);
}
}




//after click on start that button should gone and cars should be visible
start.addEventListener('click',function(){
    start.classList.add('hide');
    gameArea.innerHTML = "";
   permissionStart.start = true;
    //add car image to the game area
    const carBack = document.createElement('div');
    carBack.classList.add("background-car")
    
    gameArea.appendChild(carBack);

    const carTop = carBack.offsetTop;  //this give initial positon of car from top of game container(numerical value)
    const carLeft = carBack.offsetLeft;
     carPosition.x = carLeft;
     carPosition.y = carTop;
    //now we have to create dash lines here
    var x = 0;
   for(var i=0;i<4;i++)
   {
    const dashedLine = document.createElement('div');
    dashedLine.classList.add('dash');
    dashedLine.style.top = x+'px';
    gameArea.appendChild(dashedLine);
    x = x+175;
   }

   //now we have to create enemy cars
   //for creating multiple enemy car lets add loop 
   for(var i =0;i<3;i++) 
   {
    const enemyCars = document.createElement('div');
    enemyCars.classList.add('enemy')
    //enemyCars.classList.add('enemy1')
    const gameAreaDim = gameArea.getBoundingClientRect()
   enemyCars.y = (i*150)
   
    //let yTop = gameAreaDim.height - 200;
    let xRight = gameAreaDim.width - 100;
    //enemyCars.style.top = Math.floor(Math.random()*yTop)-Math.floor((Math.random()*30))+'px';
    enemyCars.style.top = enemyCars.y +"px"
    enemyCars.style.left = Math.floor(Math.random()*xRight)+'px';
    //enemyCars.style.backgroundColor = randomColor();
    gameArea.append(enemyCars);
 
   }
       //increase score
        
       
   //Now and animation effecct
   window.requestAnimationFrame(getAnimation);
   


})

function buttonPress(e){
    e.preventDefault() //it prevent from key to do default action
    player[e.key]=true;
}
function buttonRelease(e){
    e.preventDefault() //it prevent from key to do default action
    player[e.key] = false;
}
//function for random color
/*function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substring(-2)
    }
    return "#" + c() + c() + c();
}*/



 //lets add some eventlistner for listen key press by useer 
 document.addEventListener('keydown' ,buttonPress); //keyup listen  keyprress event
 document.addEventListener('keyup' ,buttonRelease);//keydown listen key released event


