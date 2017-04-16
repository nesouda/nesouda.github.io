var freq=440;
var ctx = new AudioContext();
var vco0;
var wave=1;
vco0=ctx.createOscillator();
vco0.connect(ctx.destination);

    function freqChange(){
      freq = document.getElementById("frequency").value
      document.getElementById("showRangeArea").innerHTML = freq;
      vco0.frequency.value = freq;
    }

    function sound_on(){
      vco0.start(0);
    }

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