var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climberImgs, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup,score = 0;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  climberImgs = loadImage("climber3.png")
  ghostImg = loadImage("ghost-standing.png");

}

function setup(){
  createCanvas(1350,650);
  //spookySound.loop();
  tower = createSprite(600,600);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  tower.scale = 5


  
  //doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(300,550,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  ghost.debug = false
  ghost.setCollider("rectangle",0,0,ghost.width,ghost.height);
  

}

function draw(){
  background(0);
  text("Score: "+ score, 500,50);

  if (tower.velocityY) {
    score = score + 1
  }
      
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 10;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 10;
    }
    if(keyDown("up_arrow")){
      ghost.y = ghost.y - 10;
    }
    if(keyDown("down_arrow")){
      ghost.y = ghost.y + 10;  
    }
    
    //if(keyDown("space")){
      //ghost.velocityY = -10;
    //}
    
   // ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

 
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(climbersGroup.isTouching(ghost) || ghost.y < 100){
      ghost.destroy();
      gameState = "end"
      tower.destroy();
      
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 20 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(50,10);
    //var invisibleBlock = createSprite(200,15);
    //invisibleBlock.width = climber.width;
    //invisibleBlock.height = 2;
    climber.scale = 0.2
    door.x = Math.round(random(100,1200));
    climber.x = door.x;
    //invisibleBlock.x = door.x;
    
    //door.addImage(doorImg);
    climber.addImage(climberImg);
    
    //door.velocityY = 1;
    climber.velocityY = 7;
    
    //invisibleBlock.velocityY = 1; 
    
    //ghost.depth = door.depth;
    //ghost.depth +=3;
   
    //assign lifetime to the variable
    //door.lifetime = 800;
    climber.lifetime = 2220;
    //invisibleBlock.lifetime = 800;

    
    //add each door to the group
    //doorsGroup.add(door);
    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    //invisibleBlockGroup.add(invisibleBlock);

    if (frameCount % 100 === 0) {
      var climber2 = createSprite(510,10);
      climber2.addImage(climberImgs);
      climber2.velocityY = 5
      climber2.lifetime = 1000;
      climber2.scale = 0.15
      climbersGroup.add(climber2);
     // climber2.y = Math.round(random(100,1200));
      

  }
}

}