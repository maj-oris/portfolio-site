let cBodies = [];
let cBodiesDummy = [];
let keys = [];
let asteroids = [];
let bullets = [];
let massSizeFactor = 0.05;
let score = 0;
let ticker = 0;
let ticker2 = 0;
let noActiveAsteroids = 0;
let gameOver = false;
let lives = 3;
let gametime = 0;

//////////////////////

cvs = document.getElementById("canvas");
ctx = cvs.getContext("2d");

bckgCvs = document.getElementById("bckgCanvas");
bckgCtx = bckgCvs.getContext("2d");

scoreCvs = document.getElementById("scoreCanvas");
scoreCtx = scoreCvs.getContext("2d");
scoreCtx.textBaseline = "middle";
scoreCtx.textAlign = "center";
scoreCtx.fillStyle = "#999999";
scoreCtx.font = "30px sans-serif";

livesCvs = document.getElementById("livesCanvas");
livesCtx = livesCvs.getContext("2d");
livesCtx.textBaseline = "middle";
livesCtx.textAlign = "center";
livesCtx.fillStyle = "#999999";
livesCtx.font = "30px sans-serif";

//////////////////////
//Functions

//asteroid:(x,y,speed,heading,speedLimit,level)
//ship:(x,y,speed,heading,size,speedLimit)

function Setup(){
  cBodies.push(new cBody(cvs.width/2, cvs.height/2, 600));
  asteroids.push(new asteroid(cvs.width/2, cvs.height/2-150, -2, 0, 3, 4));
  ship = new ship(cvs.width/2, cvs.height/2+150, 2, 0, 10, 6);

  //render cBodies onto background canvas:
  for (let i = 0; i < cBodies.length; i++) {
    cBodies[i].Draw();
  }

  //create 'dummy' cBodies to prevent screenwrap-related gravitational weirdness:
  if (cBodies.length != 0 ) {
    for (let i = 0; i < cBodies.length; i++) {
      cBodiesDummy.push(new cBody(cBodies[i].x+cvs.width,cBodies[i].y,cBodies[i].mass));
      cBodiesDummy.push(new cBody(cBodies[i].x-cvs.width,cBodies[i].y,cBodies[i].mass));
      cBodiesDummy.push(new cBody(cBodies[i].x,cBodies[i].y+cvs.height,cBodies[i].mass));
      cBodiesDummy.push(new cBody(cBodies[i].x,cBodies[i].y-cvs.height,cBodies[i].mass));
    }
  }
  cBodies = cBodies.concat(cBodiesDummy);

  //trick to work with multiple different key inputs at the same time:
  document.body.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e){
    keys[e.keyCode] = false;
    if(e.keyCode === 32){
      bullets.push(new bullet(ship.x,ship.y,4,ship.angle));
    }
  });

  //call recursive render function:
  Render();
}

function Lives(){
  livesCtx.clearRect(0,0,livesCvs.width,livesCvs.height);
  livesCtx.fillText(lives.toString(), (livesCvs.width/2), (livesCvs.height/2));

  if(lives < 0){
    gameOver = true;
  }
}

function Score(){
  scoreCtx.clearRect(0,0,scoreCvs.width,scoreCvs.height);

  if(gametime%5 == 0){
    score++;
  }

  gametime += 1;

  scoreCtx.fillText(score.toString(), (scoreCvs.width/2), (scoreCvs.height/2));
}

function GameOver(){

  var f1 = document.createElement("form");
  f1.className = "entryform";
  f1.method = "POST";


  var p1 = document.createElement("p");
  p1.innerText = "Please enter a player name to save a record of your score:";
  f1.appendChild(p1);

  var i1 = document.createElement("input");
  i1.type = "text";
  i1.name = "playername";
  f1.appendChild(i1);

  var hi1 = document.createElement("input");
  hi1.type = "hidden";
  hi1.name = "score";
  hi1.value = score;

  var hi2 = document.createElement("input");
  hi2.type = "hidden";
  hi2.name = "time";
  hi2.value = gametime;

  f1.appendChild(hi1);
  f1.appendChild(hi2);

  var i2 = document.createElement("input");
  i2.type = "submit";
  i2.className = "submit";
  i2.name = "submit";
  i2.value = "Submit"

  f1.appendChild(i2);

  var p2 = document.createElement("p");
  p2.innerText = "By submitting this, you agree that your entered player name, the time and date of this entry, your score, and the duration of this playthrough will be saved. No additional information will be stored.";

  var p3 = document.createElement("p");
  p3.innerText = "Caution: if you do not enter a player name, this record will be lost.";

  document.getElementById("scorepanel").appendChild(f1);
  document.getElementById("scorepanel").appendChild(p2);
  document.getElementById("scorepanel").appendChild(p3);
}

function Render(){


  //check if active asteroids exist:
  noActiveAsteroids = 0;
  for(let i = 0; i < asteroids.length; i++) {
    if(asteroids[i].visible == true) {
      noActiveAsteroids++;
    }
  }

  //if they do not, respawn the starting asteroid:
  if(noActiveAsteroids == 0){
    asteroids.length = 0;
    asteroids.push(new asteroid(cvs.width/2, cvs.height/2-150, -2, 0, 3, 4));
  }

  ////

  Score();
  Lives();

  ctx.clearRect(0, 0, cvs.width, cvs.height);

  //update and render asteroids, ship, and bullets:
  for (let j = 0; j < asteroids.length; j++) {
    if(asteroids[j].visible == true){
      asteroids[j].Update();
      asteroids[j].Draw();
    }
  }
  for (let k = 0; k < bullets.length; k++) {
    if(bullets[k].visible == true){
      bullets[k].Update();
      bullets[k].Draw();
    }

  }
  ship.Update();
  ship.Steer();
  ship.Draw();
  ship.CollisionCheck();

  //recursive call
  if (gameOver == false){
    requestAnimationFrame(Render);
  } else {
    GameOver();
  }
}
//////////////////////
//Classes

//celestial body
class cBody{
  constructor(x,y,mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;
  }
  Draw(){
    bckgCtx.beginPath();
    bckgCtx.strokeStyle = "white";
    bckgCtx.fillStyle = "#404055";
    bckgCtx.arc(this.x, this.y, this.mass*massSizeFactor , 0, 2 * Math.PI);
    bckgCtx.closePath();
    bckgCtx.fill();
    bckgCtx.stroke();
  }
}

class bullet{
  constructor(x,y,speed,heading) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.heading = heading;
    this.velY = Math.sin(this.heading) * this.speed;
    this.velX = Math.cos(this.heading) * this.speed;
    this.visible = true;
  }
  Update(){
    //check for bullet leaving screen:
    if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height){
      this.visible = false;
    }

    //check for cBody collisions:
    for(let i = 0; i < cBodies.length; i++){
      var angle = Math.atan2(this.y - cBodies[i].y, this.x - cBodies[i].x);
      var dist = Math.sqrt(Math.pow((this.y - cBodies[i].y),2) + Math.pow((this.x - cBodies[i].x),2));
      this.velY -= Math.sin(angle) * cBodies[i].mass/(dist**2);
      this.velX -= Math.cos(angle) * cBodies[i].mass/(dist**2);
      if(dist < cBodies[i].mass*massSizeFactor){
        this.visible = false;
        break;
      }
    }

    //check for asteroid collisions:
    for(let j = 0; j < asteroids.length; j++){
      var dist = Math.sqrt(Math.pow((this.y - asteroids[j].y),2) + Math.pow((this.x - asteroids[j].x),2));
      if((dist < asteroids[j].size) && (asteroids[j].visible == true)){
        this.visible = false;
        //asteroids[j].visible = false;
        asteroids[j].Explode();
        break;
      }
    }
    //apply movement
    this.x += this.velX;
    this.y += this.velY;
  }
  Draw(){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, 2 , 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

//orbital body
class oBody{
  constructor(x,y,speed,heading,size,speedLimit) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.heading = (heading * Math.PI / 180);
    this.velY = Math.sin(this.heading) * this.speed;
    this.velX = Math.cos(this.heading) * this.speed;
    this.size = size;
    this.speedLimit = speedLimit;
  }
  Update(){

    //screen wrap:
    if(this.x > cvs.width){
      this.x = 0;
    }
    if(this.x < 0){
      this.x = cvs.width;
    }
    if(this.y > cvs.height){
      this.y = 0;
    }
    if(this.y < 0){
      this.y = cvs.height;
    }

    //effects of gravitational pulls:
    for(let i = 0; i < cBodies.length; i++){
      var angle = Math.atan2(this.y - cBodies[i].y, this.x - cBodies[i].x);
      var dist = Math.sqrt(Math.pow((this.y - cBodies[i].y),2) + Math.pow((this.x - cBodies[i].x),2));

      if(dist > ((cBodies[i].mass*(massSizeFactor*1.2)) + (this.size/2))){
        this.velY -= Math.sin(angle) * cBodies[i].mass/(dist**2);
        this.velX -= Math.cos(angle) * cBodies[i].mass/(dist**2);
      } else {
        this.velY += Math.sin(angle) * cBodies[i].mass/(dist**2) * 5;
        this.velX += Math.cos(angle) * cBodies[i].mass/(dist**2) * 5;
      }
    }

    //speed limit enforcement
    this.speed = Math.sqrt((this.velX ** 2) + (this.velY ** 2));

    if(this.speed > this.speedLimit) {
      this.velX /= (this.speed/this.speedLimit);
      this.velY /= (this.speed/this.speedLimit);
    }

    //console.log(this.speed)

    //apply movement
    this.x += this.velX;
    this.y += this.velY;
  }
}

class asteroid extends oBody{
  constructor(x,y,speed,heading,speedLimit,level) {
    super(x,y,speed,heading,speedLimit);
    this.level = level;
    this.size = level*10;
    this.visible = true;
  }
  Draw(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    for(let i = 0; i < 7; i++){
      ctx.lineTo(this.x + this.size * Math.cos((Math.PI * 2 * i/7)),this.y + this.size * Math.sin((Math.PI * 2 * i/7)));
    }
    ctx.closePath();
    ctx.stroke();
  }
  Explode(){
    this.visible = false;
    this.speed = Math.sqrt((this.velX ** 2) + (this.velY ** 2));
    //this.heading = (Math.atan(this.velX/this.velY) * Math.PI / 180);
    if(this.level > 1){
      for(let i = 0; i < 3; i++){
        //asteroids.push(new asteroid(this.x, this.y, this.speed, ((this.heading * Math.PI / 180) + ((Math.random() * 50) - 25)), this.speedLimit, this.level - 1));
        asteroids.push(new asteroid(this.x, this.y, this.speed, Math.random()*359, this.speedLimit, this.level - 1));
      }
    }

    score += 100;

  }
}

class ship extends oBody{
  constructor(x,y,speed,heading,size,speedLimit) {
    super(x,y,speed,heading,size,speedLimit);
    this.angle = 0;
  }
  Draw(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.fillStyle = "black";
    for(let i = 0; i < 3; i++){
      if(i==0){
        ctx.lineTo(this.x + (this.size*1.5) * Math.cos((Math.PI * 2 * i/3) + this.angle),this.y + (this.size*1.5) * Math.sin((Math.PI * 2 * i/3) + this.angle));
      } else {
        ctx.lineTo(this.x + this.size * Math.cos((Math.PI * 2 * i/3) + this.angle),this.y + this.size * Math.sin((Math.PI * 2 * i/3) + this.angle));
      }

    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  Steer(){
    if(keys[68]){
      //left
      this.angle += 0.05;
    }
    if(keys[65]){
      //right
      this.angle -= 0.05;
    }
    if(keys[87]){
      //forward
      this.velY += Math.sin(this.angle) * 0.05;
      this.velX += Math.cos(this.angle) * 0.05;
    }
    if(keys[83]){
      //backward
      this.velY -= Math.sin(this.angle) * 0.05;
      this.velX -= Math.cos(this.angle) * 0.05;
    }
  }
  CollisionCheck(){
    //check for asteroid collisions:
    if(ticker == 0){ //only allow a collision every 50 ticks
      for(let j = 0; j < asteroids.length; j++){
        var dist = Math.sqrt(Math.pow((this.y - asteroids[j].y),2) + Math.pow((this.x - asteroids[j].x),2));
        if((dist < (asteroids[j].size + this.size)) && (asteroids[j].visible == true)){
          ticker = 50;
          lives -= 1;
          asteroids[j].Explode();
          break;
        }
      }
    } else {
      ticker -= 1;
    }

    //check for cBody collisions:
    if(ticker2 == 0){ //only allow a collision every 50 ticks
      for(let j = 0; j < cBodies.length; j++){
        var dist = Math.sqrt(Math.pow((this.y - cBodies[j].y),2) + Math.pow((this.x - cBodies[j].x),2));
        if(dist < (cBodies[j].mass*massSizeFactor + this.size)){
          ticker2 = 50;
          lives -= 1;
          break;
        }
      }
    } else {
      ticker2 -= 1;
    }

  }
}

//////////////////////

document.addEventListener('DOMContentLoaded', Setup);
