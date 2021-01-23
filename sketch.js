var girl, girlImage;
var PowerCircle,powerCircleImage;
var gameState="play";
var gameover;
score=000;
life=0;



function preload(){
 girlImage = loadAnimation("girl/girl1.png","girl/girl2.png",
 "girl/girl3.png","girl/girl4.png","girl/girl5.png");
 girlkickImage = loadAnimation("girl/girl5.png");
 fighterstopImage = loadAnimation("fighter/fighter8.png");
 fighterImage = loadAnimation("fighter/fighter3.png","fighter/fighter4.png","fighter/fighter5.png","fighter/fighter7.png","fighter/fighter8.png");
 playgroundImage = loadImage("bg.png");
 //movebackimage=loadAnimation("girl/girl4.png","girl/girl4.png",
 //"girl/girl3.png","girl/girl2.png",)
bulletImage=loadImage("bullets.png");
powerImage=loadImage("power.png");
heartImage=loadImage("heart.png");
gameoverImage=loadImage("gameover.png");
powerCircleImage=loadImage("powercircle.png");
retryImage=loadImage("retry.png");
coinImage=loadImage("coin.png");
buffImage=loadImage("boombuff.png");
}

function setup() {
  createCanvas(1000,450);
  
    //creating playground
  playground = createSprite(600,120);
  playground.addImage("playground",playgroundImage);
  playground.scale = 1.9;
  playground.velocityX =-4;
  

 //creating girl
  girl = createSprite (330,330,30,30);
  girl.addAnimation("girl",girlImage);
  girl.addAnimation("girlkick",girlkickImage);
  
  girl.scale=0.3;
  girl.debug=true;
  //girl.setCollider("rectangle",0,0,350,400)
  girl.setCollider("circle",0,0,200);

  retry=createSprite(500,50);
  retry.addImage(retryImage);
  retry.visible=false;
  retry.scale=0.2;

  gameover = createSprite (500,150,30,30);
  gameover.addImage("gameover",gameoverImage);
  gameover.visible=false;
  gameover.scale=0.3;

  edges=createEdgeSprites();

  
  PowerCircleGroup = new Group();
  PowerGroup = new Group();
  fighterGroup = new Group();
  coinGroup = new Group(); 
  bulletGroup = new Group();

  buff=createSprite(girl.x,girl.y);
  buff.addImage(buffImage);
  buff.visible=false;
  buff.scale=0.6;

  coinscore=createSprite(760,30);
  coinscore.addImage(coinImage);
  coinscore.scale=0.2;

  heart=createSprite(160,30);
  heart.addImage(heartImage);
  heart.scale=0.1;

  heart1=createSprite(120,30);
  heart1.addImage(heartImage);
  heart1.scale=0.1;

  heart2=createSprite(80,30);
  heart2.addImage(heartImage);
  heart2.scale=0.1;

  invisibleGround=createSprite(500,430,1000,20);
  invisibleGround.visible=false;
}

function draw() {
  
  

  if(gameState="play"){

    
    buff.visible=false;
    playground.velocityX =-4;    
    if(playground.x < 0){
      playground.x = 600;
    }
    
    if(keyDown("left")){
      girl.x=girl.x-2;
     // girl.changeAnimation(movebackimage)
    }
    if(keyDown("right")){
      girl.x=girl.x+2
    }
    if(keyDown("up")){
      girl.y=girl.y-2;
    }
    if(keyDown("down")){
      girl.y=girl.y+2
    }

    retry.visible=false;

    CreateFighter();
    CreatePower();
    Createcoin();
    Createbullet();

    if(girl.isTouching(fighterGroup) || girl.isTouching(bulletGroup)){
      gameState="restart";
      retry.visible=true;
      buff.visible=true;
      buff.x=girl.x+70;
      fighterGroup.x=fighterGroup-50;
      
  
    }
   console.log(life); 
    

    if(keyWentDown("space")){
      gameState="kick";
    }
    if(keyWentUp("space")){
      girl.changeAnimation("girl",girlImage);
    }
    girl.velocityY=girl.velocityY+0.5;

    if(girl.isTouching(coinGroup)){
      score=score+10;
      coinGroup.destroyEach();
    }
    
  console.log(gameState)
 }

  if(gameState==="restart"){
    gameOver();
    
  }
  if(mousePressedOver(retry)){
    gameState="play";
    life=life+1;
    girl.x=100;
    gameover.visible=false;
    fighterGroup.destroyEach();
  }
  
  if(gameState==="kick"){
    girl.changeAnimation("girlkick",girlkickImage);
   girl.velocityY=-15 ;
  }
  
  girl.collide(invisibleGround);
  girl.collide(edges[2])
  
  drawSprites();
  stroke("black");
  strokeWeight(3);
  textSize(20);
  fill("grey");
  textFont("Impact");
  text(score,800,40);
}

function CreateFighter(){
  if(frameCount%300=== 0){
    fighter = createSprite (1200,320,30,30);
    fighter.addAnimation("fighter",fighterImage);
    fighter.addAnimation("fighterstop",fighterstopImage);
    fighter.scale=1.2;
    fighter.velocityX=-6;
    fighter.lifetime=250;
    fighter.debug=true;
    fighter.setCollider("rectangle",0,0,100,70)
    buff.depth=fighter.depth+1;
    fighterGroup.add(fighter);
  }
}

function CreatePower(){
  if(frameCount===300 || frameCount===1500 ){
   
    PowerCircle = createSprite (1100,250,30,30);
    PowerCircle.addImage("PowerCircle",powerCircleImage);
    PowerCircle.rotationSpeed=20;
    
    PowerCircle.scale=0.4;
    PowerCircle.velocityX=-3;
    PowerCircle.lifetime=250;

    PowerCircleGroup.add(PowerCircle);

    Power = createSprite (1100,250,30,30);
    Power.addImage("Power",powerImage);
    Power.scale=0.4;
    Power.velocityX=-3;
    Power.lifetime=250;

    PowerGroup.add(Power);
    }
 
}

function gameOver(){
  gameover.visible=true;
  playground.velocityX=0;
  fighterGroup.setVelocityXEach(0);
  bulletGroup.setVelocityEach(0,0);
  PowerGroup.setVelocityXEach(0);
  PowerCircleGroup.setVelocityXEach(0);
  coinGroup.destroyEach();
  
  fighterGroup.setLifetimeEach(-1);
  bulletGroup.setLifetimeEach(-1);
  girl.changeAnimation("girlkick",girlkickImage);
 // fighter.changeAnimation("fighterstop",fighterstopImage);
  girl.setVelocity(0,0);
}

function Createcoin(){
  if(frameCount%100===0){
  coin=createSprite(random(500,900),random(100,400));
  coin.addImage(coinImage);
  coin.scale=0.3
  coin.velocityX=-4;
  coinGroup.add(coin);
  coin.debug=true;
  coin.setCollider("circle",0,0,80);
  }
}

function Createbullet(){
  if(frameCount%100===0){
  bullet=createSprite(random(500,900),-10);
  bullet.addImage(bulletImage);
  bullet.scale=0.05;
  bullet.velocityX=-4;
  bullet.velocityY=4;
  bulletGroup.add(bullet);
  bullet.debug=true;
  bullet.lifetime=200;
  bullet.setCollider("circle",0,0,20);
  }
}