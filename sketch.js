let points = [[0,0],[5,0],[5,1],[6,1],[6,-4],[5,-4],[5,-2],[4,-2],[4,-4],[3,-4],[3,-2],[2,-2],[2,-4],[1,-4],[1,-2],[0,-2],[0,-4],[-1,-4],[-1,1],[-3,1],[-3,2],[-2,2],[-2,3],[-1,3],[-1,4],[0,4],[0,3],[1,3],[1,2],[0,2],[0,0],[5,0],[5,1]]; //list資料，

var fill_colors = ["#cdb4db", "#ffc8dd", "#bde0fe", "#CED4F2", "#c9cad9"];
var line_colors = ["#ffd6ff", "#e7c6ff", "#c8b6ff", "#DEC8E5", "#EFBCD9"];

//++++++設定畫points所有"點"的物件變數
var ball   //"目前要處理"的物件，暫時放在ball變數內
var balls =[]  //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++++++++++++++

//++++++++設定飛彈物件的變數
var bullet  //"目前要處理"的物件，暫時放在bullet變數內
var bullets =[]   //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

var score = 0


function preload(){  //程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  elephant_sound = loadSound("sound/HORSE.mp3")
  bullet_sound = loadSound("sound/Launching wire.wav")
}  

function setup() {
  createCanvas(windowWidth, windowHeight);  
  for(var i=0;i<10 ;i=i+1){  //i=0，1，2，3，4，.......，8，9
    ball = new Obj({})  //產生一個新的Obj class元件
    balls.push(ball)  //把ball的物件放入到balls陣列內
  }
}
function draw() {
  background("#59546c");

  
  //大象的顯示
  for(let ball of balls)  //只要是陣列的方式，都可以利用此方式處理
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){   //檢查每一個飛彈物件
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){    //飛彈物件有沒有接觸現在的ball
          balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
          bullets.splice(bullets.indexOf(bullet),1)
          score = score + 1
          elephant_sound.play()
        }
      }
  }

  //飛彈的顯示
  for(let bullet of bullets)  //只要是陣列的方式，都可以利用此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  textSize(50)
  text(score,50,50)    //在座標為(50,50)上，顯示score分數內容
  push()  //重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2
    let dy  = mouseY - height/2
    let angle = atan2(dy,dx) 
    translate(width/2,height/2)
    fill("#196AC4")
    noStroke()
    rotate(angle)
    triangle(-25,-25,-25,25,50,0)  //設定三個點，畫成一個三角形
    ellipse(0,0,50)
  pop()  //恢復原本設定，原點(0,0)在視窗的左上角
}

function mousePressed(){

  //+++++++產生一個物件+++++++++++++++++++++++
  // ball = new Obj({
  //   p:{x:mouseX, y:mouseY}
  // })  //在滑鼠按下的地方，產生一個新的Obj class元件
  // balls.push(ball)  //把ball的物件放入到balls陣列內(丟到倉庫)
  //++++++++++++++++++++++++++++++++++++

  //在物件上按下滑鼠，物件消失不見，分數加1分++++++++++
  // for(let ball of balls){   //檢查每一個物件
  //   if(ball.isBallInRanger(mouseX,mouseY)){  
  //     balls.splice(balls.indexOf(ball),1)  //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))，只取1個
  //     score = score + 1
  //   }
  // }
  //++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++按一下產生一個飛彈++++++++++
  bullet  = new Bullet({})  //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
  bullets.push(bullet)    //把bullet的物件放入到bullets陣列內(丟到倉庫)
  bullet_sound.play()
}