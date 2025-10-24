//Raghav Senthilkumar
console.log("Javascript is connected");

const audioFile = document.getElementById("audioFile");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playButton");
const pauseBtn = document.getElementById("puaseButton");
const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;



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
      draw();
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

function draw (){

requestAnimationFrame(draw);
analyser.getByteFrequencyData(dataArray);

canvasContext.fillStyle = "rgb(0, 0, 0)";
canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

const barWidth = (WIDTH / bufferLength) * 2.5;
let barHeight;
let x = 0;

for(let i = 0; i < bufferLength; i++){
  barHeight = dataArray[i];
  canvasContext.fillStyle = "rgb(" + (barHeight + 100) + ", 50, 50)";
  canvasContext.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
  
  x += barWidth + 1;

}









}




