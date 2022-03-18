var gameState="intro"
var score
function preload(){
bgImg=loadImage("story.png")
bg1=loadImage("track.png")
playerpic=loadAnimation("D2.png","D3.png","D4.png","D5.png",
"D6.png","D7.png")
blast=loadAnimation("blast.png")
coin=loadImage("goldCoin.png")
ObImg=loadImage("obstacle2.png")
}
function setup(){
createCanvas(1300,1000)
 bg=createSprite(630,500,800,1000)
 bg.scale=0.9
 bg.addImage(bgImg)
 backg=createSprite(400,500,800,1000)
 backg.addImage(bg1)
 backg.scale=0.6

 player=createSprite(100,500,30,60)
 player.addAnimation("player",playerpic)
 player.addAnimation("playerstopped",blast)
 player.scale=0.8
 coinsGroup=new Group()
 obstacleGroup=new Group()
 score=0
 
}
function draw(){
background("red")

drawSprites()

if (gameState==="intro"){
  backg.visible=false
bg.visible=true
player.visible=false
}

if(keyDown("enter")){
gameState="play"
}

if(gameState==="play"){
  textSize(44)
  fill("white")
  text("Score: " +score,1080,200)
  bg.visible=false
  backg.visible=true
player.visible=true
player.y=World.mouseY
backg.velocityX=-(10+score/20)
if(backg.x<0){
  backg.x=500
}
createCoins()
createObstacle()
if(player.isTouching(coinsGroup)){
for(var i=0;i<coinsGroup.length;i++){
 if(player.isTouching(coinsGroup[i]) ){
coinsGroup[i].destroy()
score=score+10
}
}}

  if(obstacleGroup.isTouching(player)) {
    gameState="end";
   
  }
}
if(gameState==="end"){
  player.changeAnimation("playerstopped",blast);
  player.scale=0.8;
  backg.visible=true
  backg.velocityX=0
  obstacleGroup.destroyEach();
  coinsGroup.destroyEach();
  coinsGroup.setVelocityYEach(0);
  obstacleGroup .setVelocityYEach(0);
}
}






function createCoins(){

if(frameCount%70===0){
var coins=createSprite(1300,random(0,1000),20,20)
coins.addImage(coin)
coins.velocityX=-6
coins.scale=0.5
coinsGroup.add(coins)
coins.lifetime=1000
}

}
function createObstacle(){
  if (World.frameCount % 530 == 0) {
  var obstacle = createSprite(1300,random(0,850),40,50);
  obstacle.addImage(ObImg);
  obstacle.scale=0.5;
  obstacle.velocityX = -6;
  obstacle.lifetime = 1050;
  obstacleGroup.add(obstacle);
  }
}
