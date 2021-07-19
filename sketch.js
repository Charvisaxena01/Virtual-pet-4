var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;
var food

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
garden=loadImage("pet/Garden.png");
washroom=loadImage("pet/Wash Room.png");
bedroom=loadImage("pet/Bed Room.png");
living_room = loadImage("pet/Living Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(800,600);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(600,290,250,250);
  dog.addImage(sadDog);
  dog.scale=0.5;
  

 
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("green")

  foodObj.display();

    

   
   
  if(gameState===1){
    dog.addImage(happyDog)
    dog.scale = 0.5
    dog.y = 250
  }
  if(gameState===2){
    dog.addImage(sadDog)
    dog.scale = 0.175
    dog.y = 150
  
  }
  var Bath = createButton("I want to take Bath");
  Bath.position(560,125)
  if(Bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gameState':gameState});
  }));
  
  if(gameState==3){
    dog.addImage(washroom)
    dog.scale= 1;
  }

  var sleepy = createButton("I am very Sleepy")
  sleepy.position(700,125)

  if(sleepy.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({
      'gameState':gameState
    })
  }));

  if(gameState==4){
    dog.addImage(bedroom)
    dog.scale = 1;
  }
  var play = createButton("Lets Play")
  play.position(830,125)
  if(play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({'gameState':gameState})
  }));
  if(gameState == 5){
    dog.addImage(living_room)
    dog.scale = 1
  }

  var garden1 = createButton("Lets play in the garden")
  garden1.position(910,125)

  if(garden1.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({
      'gameState':gameState
    })
  }));
  if(gameState==6){
    dog.addImage(garden)
    dog.scale = 1
  }
  console.log(gameState)
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time


//function to add food in stock
function addFoods(){
  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
