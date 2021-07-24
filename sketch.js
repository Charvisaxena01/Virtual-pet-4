var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;
var food;
var dogFood,readFood;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
garden=loadImage("pet/Garden.png");
washroom=loadImage("pet/Wash Room.png");
bedroom=loadImage("pet/Bed Room.png");
living_room = loadImage("pet/Living Room.png")
milk = loadImage("images/Milk.png")
bg = loadImage("images/bg.jpeg")
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

  readFood=database.ref('Food');
  readFood.on("value",function(data){
    dogFood=data.val();
  });
   
  dog=createSprite(600,290,280,250);
  dog.scale=0.5
  dog.addImage(sadDog);
  
  
 feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
 
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("green")

  foodObj.display();
 

console.log(dogFood)
   
   
  if(gameState===1){
    dog.addImage(happyDog)
   dog.scale = 0.5
    dog.y = 250
    milk.visible = false
  }
  if(gameState===2){
    dog.addImage(sadDog)
    dog.scale = 0.5
    dog.y = 150
    milk.visible = false
  }
  var Bath = createButton("I want to take Bath");
  Bath.position(560,125)
  if(Bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gameState':gameState});
  }));
  
  if(gameState==3){
    dog.addImage(washroom)
    dog.scale= 0.5;
    milk.visible = false
  }

  var sleepy = createButton("I am very Sleepy")
  sleepy.position(710,125)

  if(sleepy.mousePressed(function(){
    dog.width = displayWidth
    gameState = 4;
    database.ref('/').update({
      'gameState':gameState
    })
  }));

  if(gameState==4){
    dog.addImage(bedroom)
    dog.scale = 0.5;
    milk.visible = false
  }
  var play = createButton("Lets Play")
  play.position(500,160)
  if(play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({'gameState':gameState})
    this.image.visible = false
  }));
  if(gameState == 5){
    dog.addImage(living_room)
    dog.scale = 0.5
    milk.visible = false
  }

  var garden1 = createButton("Lets play in the garden")
  garden1.position(585,160)

  if(garden1.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({
      'gameState':gameState
    })
  }));
  if(gameState==6){
    dog.addImage(garden)
    dog.y = 175
    dog.scale = 0.5
    milk.visible = false
  }
  textSize(25)
  text("Milk Bottles Remaining" + " "+dogFood,40,530)
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

function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}
