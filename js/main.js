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
