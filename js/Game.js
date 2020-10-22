class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage("car1",carImg1);
    car2.addImage("car2",carImg2);
    car3.addImage("car3",carImg3);
    car4.addImage("car4",carImg4);


    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsRank();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("grey");
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 355;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          stroke(20)
          fill("red")
          ellipse(x,y,90,90);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)



      }
      
    }
    if(player.distance > 5500 ){
        gameState = 2
      player.rank += 1
      Player.updateCarsAtEnd(player.rank)
      text("Rank:" + player.rank,displayWidth/2,y-150)
      console.log(player.rank)

    }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    
    drawSprites();
    fill("red")
    

  }

  End(){

    


    console.log("GAME OVER")

   // game.update(2)

    console.log(player.rank)
   




  }

}
