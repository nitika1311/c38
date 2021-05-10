class Game 
{
    constructor()
    {

    }
    
    readState()
    {  //read gamestate from db
      var gameStateRef  = mydatabase.ref('gameState');
      gameStateRef.on("value",function(data){
        mygamestate = data.val();              //var gamestate of sketch
      })
    
    }

     gsupdate(state)
    {
      mydatabase.ref('/').update({
        gameState: state          //db gamestate
      });
    }
    
    async start()
    {
      if(mygamestate === 0)  //waiting gs
      {     
        myplayer = new Player();  //new player is created

        var playerCountRef= await mydatabase.ref("playerCount").once("value");

        if(playerCountRef.exists())
        {
          myplayercount = playerCountRef.val();
        }
        else
        {
           myplayer.readPlayerCount();
        }
       

        myform = new Form()  // new form is displayed
        myform.display();
      }
    
    car1 = createSprite(300,400);
    car1.addImage("car1",car1_img);
    car2 = createSprite(600,400);
    car2.addImage("car2",car2_img);
    //car3 = createSprite(500,200);
    //car3.addImage("car3",car3_img);
    //car4 = createSprite(700,200);
    //car4.addImage("car4",car4_img);
    cars = [car1, car2];

    }

    play()
    {
      myform.allhide();     //1

       
       Player.getallplayersInfo(); //3

       if(allplayers!== undefined)
       {

         background(rgb(198,135,103));
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        textSize(30)
        text("START", 300,300)
        var index= 0;

        var x=175;
        var y;
        
        for(var plr in allplayers)
        {


           //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;

        //use data form the database to display the cars in y direction
        y = displayHeight - allplayers[plr].pdistance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === myplayer.pindex)
        {
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
          
      }
    }

       if(keyDown("UP_ARROW") && myplayer.pindex !== null)
       {
         myplayer.pdistance += 30
         myplayer.updateplayerinfo();
       }

       if(myplayer.pdistance > 3860)
       {
         
         mygamestate = 2;
         mygame.gsupdate(2);
          
       }
   
    drawSprites();
  }

  end()
  {
    console.log("Game Ended");
    textSize(30)
        text("end", 300,300)
  }
}
    
