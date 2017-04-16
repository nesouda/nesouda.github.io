navigator.requestMIDIAccess().then(onMIDISuccess,onMIDIFailure);

var midi = null;
var inputs = [];
var fd1=0;
var fd2=0;
var fd3=0;
var freq0=0;
var freq1=0;
var freq_changed=0;
var sound_on=0
var wave0=0;
var wave1=0;


function onMIDISuccess(midiAccess){
  midi = midiAccess;
  var input = midi.inputs.values();
  for(var o = input.next(); !o.done; o = input.next()){
    inputs.push(o.value);
  }

  for(var cnt=0;cnt < inputs.length;cnt++){
    inputs[cnt].onmidimessage = onMIDIEvent;
  }

}


function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

function onMIDIEvent(e){
    document.getElementById("data").innerHTML="midimsg="+e.data[0]+" "+e.data[1]+" "+e.data[2];
      
    //フェーダーの値を取る
      if(e.data[0]=="224"){
        fd1=e.data[1];
        freq0=fd1*5;//vco0の周波数を変更
        document.getElementById("fader1").innerHTML= "FADER1="+fd1;
      }
      if(e.data[0]=="225"){
        fd2=e.data[1];
        freq1=fd2*10;//vco1の周波数を変更
        document.getElementById("fader2").innerHTML= "FADER2="+fd2;
      }
      if(e.data[0]=="226"){
        fd3=e.data[1];
        document.getElementById("fader3").innerHTML= "FADER3="+fd3;
      }
      if(e.data[0]=="227"){
        fd4=e.data[1];
        document.getElementById("fader4").innerHTML= "FADER4="+fd4;
      }

      //再生ボタンを押している間だけ音が鳴る
      if(e.data[0]=="144"&&e.data[1]=="94"&&e.data[2]=="127"){
          sound_on=1;
          synth();
      }
      if(e.data[0]=="144"&&e.data[1]=="94"&&e.data[2]=="0"){
        sound_on=0;
      }

      
      //SとMボタンで波形の種類を変える
      if(e.data[0]=="144"&&e.data[1]=="8"&&e.data[2]=="127"&&wave0!=3){
          wave0+=1;
          waveselect0();
      }
      if(e.data[0]=="144"&&e.data[1]=="16"&&e.data[2]=="127"&&wave0!=0){
          wave0-=1;
          waveselect0();
      }

      if(e.data[0]=="144"&&e.data[1]=="9"&&e.data[2]=="127"&&wave1!=3){
          wave1+=1;
          waveselect1();
      }
      if(e.data[0]=="144"&&e.data[1]=="17"&&e.data[2]=="127"&&wave1!=0){
          wave1-=1;
          waveselect1();
      }
      
      document.getElementById("freq").innerHTML = freq0+"Hz "+freq1+"Hz ";
}

