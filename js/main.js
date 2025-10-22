//Raghav Senthilkumar
console.log("Javascript is connected");

const audioFile = document.getElementById("audioFile");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playButton");
const pauseBtn = document.getElementById("puaseButton");
const canvas = document.getElementById("visualizer");

console.log("audioFile:", audioFile);
console.log("audio:", audio);
console.log("playBtn:", playBtn);
console.log("pauseBtn:", pauseBtn);
console.log("canvas:", canvas);


//Add File I/O

audioFile.addEventListener("change", function(){

    const file = audioFile.files[0]

     
  if (file) {
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    setupAudioContext();
    
  }

})

//Play button
playBtn.addEventListener("click", function() {
  
    console.log("Play button clicked!");
  
  audio.play()
    .then(function() {
      console.log("Audio is playing!");
    })
    .catch(function(error) {
      console.error("Error playing audio:", error);
    });

  });
  

//pause button work
pauseBtn.addEventListener("click", function() {
    
    audio.pause();

  });

  // Step 5: Set up Web Audio API
let audioContext;
let analyser;
let dataArray;
let bufferLength;

function setupAudioContext() {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  
  console.log("Web Audio API setup complete!");
}
