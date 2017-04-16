  	var vco0,vco1,lfo,vcf;
    var ctx = new AudioContext();

  function synth(){
    vco0=ctx.createOscillator();
    vco1=ctx.createOscillator();
    lfo =ctx.createOscillator();
    vcf=ctx.createBiquadFilter();

    vco0gain=ctx.createGain();
    vco1gain=ctx.createGain();


    vco0.connect(vco0gain);
    vco1.connect(vco1gain);
    vco0gain.connect(vcf);
    vco1gain.connect(vcf);
/*
    var now =ctx.currentTime;
    var attack=fd1/127,decay=fd2/127,sustain=fd3/127,release=fd4/127;
  */  
    lfo.connect(vco0.frequency);
    lfo.connect(vco1.frequency);
    lfo.connect(vcf.detune);
    vcf.connect(ctx.destination);

    vco0.frequency.value = freq0;
    vco1.frequency.value = freq1;

    waveselect0();
    waveselect1();
    if(sound_on){
  	vco0.start(0);
    vco1.start(0);
 //   lfo.start(0);
        setTimeout("freqChange()",50);
    }
  }
  
  function freqChange(){
  	vco0.stop(0);
    vco1.stop(0);
   // lfo.stop(0);
    synth();
  }


function waveselect0(){
  if(wave0==0){vco0.type="sine";}
  if(wave0==1){vco0.type="square";}
  if(wave0==2){vco0.type="triangle";}
  if(wave0==3){vco0.type="sawtooth";}
  document.getElementById("wave").innerHTML = "synth1"+vco0.type+" synth2="+vco1.type;
}
function waveselect1(){
  if(wave1==0){vco1.type="sine";}
  if(wave1==1){vco1.type="square";}
  if(wave1==2){vco1.type="triangle";}
  if(wave1==3){vco1.type="sawtooth";}
  document.getElementById("wave").innerHTML = "synth1="+vco0.type+" synth2="+vco1.type;

}
