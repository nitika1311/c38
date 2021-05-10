//1 creating global var

var mygamestate = 0;
var myplayercount=0;

var mydatabase;

var myform, myplayer, mygame;
var allplayers=[]
var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
}

function setup(){
  createCanvas(displayWidth - 20, displayHeight-30);
  mydatabase = firebase.database();  //2 creating db
  
  mygame = new Game();    //3 object of game cls and its methods
  mygame.readState();
  mygame.start();
}


function draw()
{
  if(myplayercount === 2)
  {
    mygame.gsupdate(1);
  }
  if(mygamestate === 1)
  {
    clear();
    mygame.play();
  }

  if(mygamestate === 2){
    mygame.end();
  }
}
