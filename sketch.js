var spaceImg, space;
var rocketImg, rocket;
var starImg, star, starsGroup;
var meteorImg, meteor, meteorsGroup
var score = 0
var gameState="play"


function preload(){
spaceImg = loadImage("space.png");
rocketImg = loadImage("rocket.png");
starImg = loadImage("star.png");
meteorImg = loadImage("meteor.png");
gameOverImg = loadImage("gameover.png")
}

function setup() {
createCanvas(600,600);
space = createSprite(300,300);
space.addImage("space",spaceImg);
space.velocityY = 6

rocket = createSprite(300,300);
rocket.addImage("rocket",rocketImg);
rocket.scale = 0.2

gameOver = createSprite(300,300)
gameOver.addImage("gameOver", gameOverImg)



starsGroup = createGroup()
meteorsGroup = createGroup()
}

function stars(){
  if(frameCount%60===0){
    star = createSprite(Math.round(random(100,500),0))
    star.velocityY = 5
    star.addImage(starImg)
    star.scale = 0.1
    starsGroup.add(star)
  }
}

function meteors(){
  if(frameCount%140===0){
    meteor = createSprite(Math.round(random(100,500),0))
    meteor.velocityY = 6
    meteor.addImage(meteorImg)
    meteor.scale = 0.2
    meteorsGroup.add(meteor)
  }
}


function draw() {
  background(0)
  if(space.y > 400){
      space.y = 300
  }


if(keyDown("left")){
  rocket.x -= 5
}

if(keyDown("right")){
  rocket.x += 5
}
  
  drawSprites()
  if(gameState==="play"){
    stars();
    meteors();
    gameOver.visible = false
    if(rocket.isTouching(starsGroup)){
      starsGroup.destroyEach()
      score=score+1
    }
    else{
      if(rocket.isTouching(meteorsGroup)){
       
        gameState = "end"
        meteorsGroup.destroyEach()
        meteorsGroup.setVelocityYEach(0)
        starsGroup.destroyEach()
        starsGroup.setVelocityYEach(0)
       
        space.velocityY=0
        rocket.changeImage(gameOverImg)
        rocket.x = 300
        rocket.y = 300

        gameOver.visible = true

      }
    }
  }

 
  textSize(20)
  text("Score: "+score,20,30)
 
}