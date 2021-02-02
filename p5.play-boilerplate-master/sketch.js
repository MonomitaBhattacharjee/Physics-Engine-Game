const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var engine, world;
var ground;
var man, manImg;
var stepsGroup;
var steps;
var score = 0;


function preload() {
  manImg = loadImage("walking_3.png");
}
function setup() {
  createCanvas(800, 600);

  ground = createSprite(400, 590, 800, 20);
  ground.x = ground.width / 2;
  ground.velocityY = 200;



  man = createSprite(185, 480);
  man.addImage(manImg);
  man.scale = 0.3;

  stepsGroup = new Group()

}

function draw() {
  background(10);

fill("red");
  text("Score: " + score, 500, 50);


  if (gameState === PLAY) {

    score = score + Math.round(getFrameRate() / 60);


    if (ground.y < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && man.y >= 100) {
      man.velocityY = -12;
    }

    //add gravity
    man.velocityY = man.velocityY + 0.8

  
    if(stepsGroup.isTouching(man)){
      man.velocityY = 0;
    }
    //spawn the clouds
    spawnSteps();

    if (man.y > 600) {

      gameState = END;


    }
  }
  else{ 
    if (gameState === END) {
   
    textSize(50);
    fill("yellow");
    stroke("yellow");
    text("Game Over !", 180, 250);

    steps.visible = false;
    man.visible = false;

  }
 }


  drawSprites();
}


function spawnSteps() {
  if (frameCount % 60 === 0) {
    var steps = createSprite(600, 280, 60, 10);
    steps.shapeColor = "maroon";
    steps.y = Math.round(random(80, 420));

    steps.velocityX = -3;

    //assign lifetime to the variable
    steps.lifetime = 200;

    //adjust the depth
    steps.depth = man.depth;
    man.depth = man.depth + 1;

    stepsGroup.add(steps);
  }
}
