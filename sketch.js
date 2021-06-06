var starImg,bgImg;
var star, starBody;
var fairy, fairyImg;
var edges;
var invisibleWall;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	
	//load animation for fairy here
	fairyImg = loadAnimation("images/fairyImage1.png", "images/fairyImage2.png");

	//Sound
	fairySound = loadSound("sound/JoyMusic.mp3");
}

function setup() {
	createCanvas(800, 750);

	Engine.run(Engine);

	//write code to play fairyVoice sound
	//fairySound.play();

	//create fairy sprite and add animation for fairy
	fairy = createSprite(130,520);
	fairy.addAnimation("fairyFlying",fairyImg);
	fairy.scale = 0.2;
	fairy.lifetime = -1;
	fairy.debug = true;
	fairy.setCollider("rectangle",550,0,150,900)

	var star_options = {
		isStatic: true
	}
	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;
	star.lifetime = -1;

	invisibleWall = createSprite(660, 0, 10, 1500);
	//invisibleWall.visible = false;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	World.add(world, fairy);

	World.add(world, star);
}


function draw() {
  background(bgImg);
  Engine.update(engine);

  star.x= starBody.position.x 
  star.y= starBody.position.y 

console.log(starBody);

	edges = createEdgeSprites();
  //write code to stop star in the hand of fairy
	if(star.y > 470 && starBody.position.y > 470 && fairy.x >= 650){
		Matter.Body.setStatic(starBody, true);
		star.velocityY = -3;
	}

  keyPressed();
  drawSprites();
	fairy.collide(invisibleWall);
	
	if(fairy.collide(star)){
		fairy.y = 520;
		fairy.x = 550;
		star.velocityY = 0;	
	}
}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false);
	}

	//writw code to move fairy left and right
	if(keyCode === RIGHT_ARROW){;
		fairy.x = fairy.x + 15;
	}
	
	if(keyCode === LEFT_ARROW){

		fairy.x = fairy.x - 15;
	}
}