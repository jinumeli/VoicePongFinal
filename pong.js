var input;
var mic, soundFile;
var amplitude;
var mapMax = 1.0;
var paddleA, paddleB, ball, wallTop, wallBottom;
var MAX_SPEED = 5;
var scoreA=0,scoreB=0;

function setup() {
  createCanvas(800,400);
  img = loadImage("pongtable.png");
  //frameRate(6);
  input = new p5.AudioIn();
  input.start();

  paddleA = createSprite(30, height/2, 10, 100);
  paddleA.immovable = true;
  
  paddleB = createSprite(width-28, height/2, 10, 100);
  paddleB.immovable = true;
  
  wallTop = createSprite(width/2, -50/2, width, 30);
  wallTop.immovable = true;
  
  wallBottom = createSprite(width/2, height+50/2, width, 30);
  wallBottom.immovable = true;
  
  ball = createSprite(width/2, height/2, 10, 10);
  ball.maxSpeed = MAX_SPEED;
  
  paddleA.shapeColor = paddleB.shapeColor =ball.shapeColor = color(255,255,255);
  
  ball.setSpeed(MAX_SPEED, -180);
}

function draw() {


  background(img, 0, 0);
  
  
  //var volume = input.getLevel();

  // text('Amplitude: ' + level, 20, 20);
  // text('volume: ' + volume, 20, 20);
  // text('mapMax: ' + mapMax, 20, 40);
  text('A Score: ' + scoreA, 20, 40);
  text('B Score: ' + scoreB, 670, 40);

  // paddleA.position.y = constrain(map(volume*4, 0, mapMax, height, 0), paddleA.height/2, height-paddleA.height/2);
  // paddleB.position.y = constrain(map(volume*4, 0, mapMax, height, 0), paddleA.height/2, height-paddleA.height/2);
 // paddleA.position.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);
 // paddleB.position.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);

  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  
  if(ball.bounce(paddleA)) {
    var swing = (ball.position.y-paddleA.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
  }
  
  if(ball.bounce(paddleB)) {
    var swing = (ball.position.y-paddleB.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()-swing);
  }
  
  if(ball.position.x<0) {
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 0);
  scoreB=scoreB+1;
  }
  
  if(ball.position.x>width) {
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 180);
  scoreA=scoreA+1;
  }

  
  drawSprites();

  // console.log("oh!");
  // console.log(ball.position.x)
        if(connected){ 
          old = paddle1.position.y;
          mapt = map(input.getLevel()*2, 0, 1, 400, 0);
          paddle1.position.y= lerp(old, map(input.getLevel()*2, 0, 1, 400, 0), 0.2);
          connection.send({id: mypeerId, role: myRole, vol:input.getLevel()});
          // console.log(input.getLevel());
          if(myRole == 'caller')
          {
            connection.send({
              ballx: ball.position.x,
              bally: ball.position.y,
              ballvelx: ball.velocity.x,
              ballvely: ball.velocity.y
            });
            //console.log("sent"+ball.position.x );
          }
        }
    if( scoreA >= 10 ) {
    
    swal({   title: "Team A Win!",   text: "Wow! Way to go!",   imageUrl: "clap.png", imageSize: "100x100" });


    scoreA = 0;
    scoreB = 0;
                

  }
  if( scoreB >= 10) {

     swal({   title: "Team B Win!",   text: "OMG you did it! Great game!",   imageUrl: "clap.png" });
    scoreA = 0;
    scoreB = 0;
                

  }

}


