/*
// types of data
//string
var str = "This is a string, if I write a name here that is also a string. 3.14159 is also string when used inside double quotes";
console.log(str);

//number
var num = 599.817;
console.log(num);

//Boolean
var bool = true;
console.log(bool);

// undefined
var object;
console.log(object);

// ressigning undefined to null
//null
object = null;
console.log(object);

// array holding same type of data
var arr1 = [1,2,3,4,56,86532];
console.log(arr1);

// array holding diff type of data
var arr2 = [1,2,3,4, "name", "hgfkhgdty", false];
console.log(arr2);
//console.log(arr2[4]);

// array holding list of values
var arr3 = [[1,9],["test",8655,true],[87,9987,1567]];
console.log(arr3);
console.log(arr3[1][2]);

arr3.push("rudransh");
console.log(arr3);

arr3.pop();
console.log(arr3);
*/

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;

var bg;

var score;

var gameState = "onSling"

function preload() {
    getBackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,50);

    score = 0
   // log6 = new Log(230,180,80, PI/2);
    slingShot = new Slingshot(bird.body,{x:200,y:50});
    getBackgroundImage();
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    fill("white");
    textSize(35);
    text("Score:", width+300, 50);
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingShot.display();    
}
function mouseDragged(){   
    //if(gameState!="launched")
    //{
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
    //}
}
function mouseReleased(){
    slingShot.fly();
    gameState = "launched"
}
function keyPressed()
{
        if (keyCode === 32)
    {
        bird.trajectory = []
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        slingShot.attach(bird.body);
    }
}

async function getBackgroundImage()
{
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Hong_Kong") 
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);
     if(hour>=06 && hour <=19)
    {
    bg = "sprites/bg.png"
    }
    else
    {
    bg = "sprites/bg2.jpg"
    }
    backgroundImg = loadImage(bg);
}
