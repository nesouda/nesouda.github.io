var freq=440;
var ctx = new AudioContext();
var vco0;
var wave=1;
vco0=ctx.createOscillator();
vco0.connect(ctx.destination);


//    function sound_on(){
      vco0.start(0);
//    }

    function sound_off(){
      vco0.stop(0);
      vco0=ctx.createOscillator();
      vco0.connect(ctx.destination);
    }

    function waveChange(){
      wave = document.getElementById("wave").value
      if(wave==1){
           vco0.type = "sine";
      }else if(wave==2){
           vco0.type = "triangle";
      }else if(wave==3){
           vco0.type = "square";
      }else if(wave==4){
           vco0.type = "sawtooth";
      }
      document.getElementById("showWave").innerHTML = vco0.type;
    }

      var alpha=0;
      var beta=0;
      var gamma=0;
      var width = window.innerWidth;
      var height = window.innerHeight;
      var x=width/2;
      var y=height/2;
      var speedX=0;
      var speedY=0;

      //ジャイロセンサが動いたときに動作
      window.addEventListener("deviceorientation", function(event) {
              alpha = event.alpha;
              beta = event.beta;
              gamma = event.gamma;
              speedX = Math.round(gamma/3);
              speedY = Math.round(beta/3);
              if(x<0||y<0||width<x||height<y){
                x = width/2;
                y = height/2;
              }
              x += speedX;
              y += speedY;
              document.getElementById("ball").style.left = x+"px";
              document.getElementById("ball").style.top = y+"px";
              if(width/4>x&&x>0){
                    vco0.type = "sine";
                    document.getElementById("wave").innerHTML = "sine波";
              }else if(width/2>x&&x>width/4){
                   vco0.type = "triangle";
                    document.getElementById("wave").innerHTML = "三角波";
              }else if(width*3/4>x&&x>width/2){
                   vco0.type = "square";
                    document.getElementById("wave").innerHTML = "矩形波";
              }else if(width>x&&x>width*3/4){
                   vco0.type = "sawtooth";
                    document.getElementById("wave").innerHTML = "のこぎり波";
              }
              freq = y;
              vco0.frequency.value = freq;
              document.getElementById("freq").innerHTML = freq+"Hz";

              }, false);
