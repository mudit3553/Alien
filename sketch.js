var backGround,backgroundImg;
var earth,earthImage,spaceShip,spaceShImg,a1,a2;
var crosshair,crosshairImg,crosshair,crosshairImg,health=100;
var e1,e2,e3,e4,e5,e6,e7;
var proWall;
var health=100;
var alienGroup;
var  score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var destoryImg;
var gameSound;
    function preload() {

    backgroundImg =  loadImage("assets/Space1.jpg")
    earthImage = loadImage("assets/Earth.png")
    spaceShImg = loadImage("assets/Alien.png")
    a1=loadImage("assets/A1.png");
    a2=loadImage("assets/AVictory.png")
    e1=loadImage("assets/e1.png");
    e2=loadImage("assets/e2.png");
    e3=loadImage("assets/e3.png");
    e4=loadImage("assets/e4.png");
    e5=loadImage("assets/e5.png");
    e6=loadImage("assets/e6.png");
    e7=loadImage("assets/e7.png");
    crosshairImg = loadImage("assets/Crosshair.png");
    destroyImg = loadImage("assets/Destroy.png")
    gameSound=loadSound("assets/Laser.mp3");
    
}

function setup() {
  
  createCanvas(displayWidth,displayHeight-150);
  
  backGround=createSprite(750,500,1500,500);
  backGround.addImage(backgroundImg);
  
  crosshair = createSprite(width/2,height/2,200,200)
  crosshair.addImage(crosshairImg)
 // crosshair.debug=true;
  crosshair.setCollider("circle",0,0,30);

  background.scale=1
  earth = createSprite(50,height/2,100,100)
  earth.addImage(earthImage)
  earth.scale=2;
  //earth.debug=true;
  earth.setCollider("circle",0,0,110)
  spaceShip = createSprite(1350,height/2,100,100)
  spaceShip.addImage(spaceShImg);
  spaceShip.scale = 3
  spaceShip.velocityY=2;

  proWall=createSprite(earth.x,earth.y,70,70);
  proWall.visible=false;
  proWall.debug=true;
  proWall.setCollider("circle",0,0,310);


  edges=createEdgeSprites();
 
 alienGroup = new Group();
}

function draw() {
  

  background(backgroundImg);
 
  drawSprites();

  if (gameState===PLAY)
  { 
    textSize(42);
    fill("red")
    stroke("yellow");
    text("(PRESS SPACE TO SHOOT)",displayWidth/2-200,100);
    
  crosshair.y=mouseY;
  spaceShip.bounceOff(edges);

  if(mouseX>width/4 &&mouseX<width/2){
  crosshair.x=mouseX;
  } else if(mouseX<width/4){
    crosshair.x=width/4;
    } else if(mouseX>width/2){
    crosshair.x=width/2;
  }
  
  if(keyDown("space")&& crosshair.isTouching(alienGroup)){
    alienGroup.destroyEach();
    gameSound.play(); 
    text.visible='true'
  }
  
if(proWall.isTouching(alienGroup) && health>=0){
  health -=10;
  alienGroup.destroyEach();
} 
if(earth.isTouching(alienGroup) && health<=0){
  gameState=END;
}
strokeWeight(20);
if(health>=80 && health<=100){
stroke(rgb(4, 247, 4));
}else if(health>=60 && health<80){
  stroke(rgb(186, 255, 73));
}else if(health>=40 && health<60){
  stroke(rgb(255, 143, 53));
}else if(health>=20 && health<40){
  stroke(rgb(255, 95, 73)); 
  stroke(rgb(255, 0, 0));
}
noFill();
ellipse(earth.x,earth.y,620,620);
 
  spawnAlien();
} else if(gameState===END){
  crosshair.setVelocity(0,0);
  spaceShip.setVelocity(0,0);
  textSize(82);
  fill("red")
  stroke("yellow");
  text("GAME OVER",displayWidth/2-200,displayHeight/2);
}
 
}

function spawnAlien(){

  if(frameCount%200===0) {
    var alien= createSprite(spaceShip.x-100,Math.round(random(spaceShip.y-100,spaceShip.y+100)));
    alien.velocityX=-(10+(frameCount/60));

    var rand=Math.round(random(1,7)) 
    switch(rand){
  case 1: alien.addImage(e1);
          alien.scale=0.5;
          break;
        
  case 2: alien.addImage(e2);
         alien.scale=0.2;
          break;
  case 3: alien.addImage(e3);
          alien.scale=0.2;
           break;
  case 4: alien.addImage(e4);
           alien.scale=0.2;
            break;
  case 5: alien.addImage(e5);
            alien.scale=0.2;
             break;
  case 6: alien.addImage(e6);
             alien.scale=0.2;
              break;
  case 7: alien.addImage(e7);
              alien.scale=0.2;
               break;
    }
    alien.lifetime=300;
    alien.scale=0.5;
    alienGroup.add(alien);
  }
}