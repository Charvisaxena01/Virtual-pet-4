class Food {
  constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image=loadImage('images/Milk.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){
      background("brown");


      var feed=createButton("Feed the dog");
      feed.position(700,95);
     if(feed.mousePressed(function(){
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
       foodS = foodS-1;
       gameState = 1
       database.ref('/').update({'gameState':gameState})
     }));


      fill(255,255,254);
      textSize(15);
      if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 50,30);
      }else if(lastFed==0){
          text("Last Feed : 12 AM",50,30);
      }else{
          text("Last Feed : "+ lastFed + " AM", 50,30);
      }
      var x=70,y=100; 
      imageMode(CENTER);
      if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=70;
          y=y+80;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  }


}