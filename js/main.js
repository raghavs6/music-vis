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

// Step 7: Visualization modes
let currentVisualization = "bars";

function draw() {
  requestAnimationFrame(draw);
  
  analyser.getByteFrequencyData(dataArray);
  
  // Clear canvas
  canvasContext.fillStyle = "rgb(0, 0, 0)";
  canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
  
  // Draw based on selected visualization
  if (currentVisualization === "bars") {
    drawBars();
  } else if (currentVisualization === "circular") {
    drawCircular();
  } else if (currentVisualization === "waveform") {
    drawWaveform();
  }
}

function drawBars() {
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    
    canvasContext.fillStyle = "rgb(" + (barHeight + 100) + ", 50, 50)";
    canvasContext.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
    
    x += barWidth + 1;
  }
}
function drawCircular() {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const radius = 100;
  
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;
    
    const angle = (i / bufferLength) * Math.PI * 2;
    
    const x1 = centerX + Math.cos(angle) * radius;
    const y1 = centerY + Math.sin(angle) * radius;
    
    const x2 = centerX + Math.cos(angle) * (radius + barHeight);
    const y2 = centerY + Math.sin(angle) * (radius + barHeight);
    
    canvasContext.strokeStyle = "rgb(" + (barHeight + 100) + ", 50, 200)";
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
  }
}
function drawWaveform() {
  analyser.getByteTimeDomainData(dataArray);
  
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = "rgb(0, 255, 0)";
  
  canvasContext.beginPath();
  
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * HEIGHT) / 2;
    
    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }
    
    x += sliceWidth;
  }
  
  canvasContext.lineTo(WIDTH, HEIGHT / 2);
  canvasContext.stroke();
}
const visualizationSelector = document.getElementById("visualizationType");

visualizationSelector.addEventListener("change", function() {
  currentVisualization = visualizationSelector.value;
  console.log("Switched to:", currentVisualization);
});










