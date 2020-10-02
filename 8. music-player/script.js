const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currTimeEL = document.getElementById('curr-time');
const durationEL = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('forward');

// Music
const songs = [
  {
  name: 'jacinto-1',
  displayName: 'Electric Chill Machine',
  artist: 'Jacinto'
  },
  {
  name: 'jacinto-2',
  displayName: 'Seven Nation Army',
  artist: 'Jacinto'
  },
  {
  name: 'jacinto-3',
  displayName: 'Goodnight,Disco Queen',
  artist: 'Jacinto'
  },
  {
  name: 'metric-1',
  displayName: 'Front Row',
  artist: 'Jacinto'
  },

]

// Check if Played
let isPlaying = false;

// Play
function playSong(){
  isPlaying = true;
  playBtn.classList.replace('fa-play','fa-pause');
  playBtn.setAttribute('title', 'Pause') 
  music.play();
}
// Pause
function pauseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-pause','fa-play');
  playBtn.setAttribute('title', 'Play') 
  music.pause();
}

// Play Button
playBtn.addEventListener('click', () => (isPlaying? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0;

// Prev
function prevSong(){
  songIndex--;
  if(songIndex<0){
    songIndex = songs.length -1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Next
function nextSong(){
  songIndex++;
  if(songIndex> songs.length -1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load Select First
loadSong(songs[songIndex])

// Update Progress Bar
function updateProgressBar(e){
  if(isPlaying){
    const {duration, currentTime} = e.srcElement;
    // Update Progress bar width
    const progressTime = (currentTime/duration) * 100;
    progress.style.width = `${progressTime}%`;
    // Calculate Duration
    const durationMinute = Math.floor(duration / 60); 
    let durationSecond = Math.floor(duration%60);
    if(durationSecond<10){
      durationSecond = `0${durationSecond}`;
    }

    // Delay Switching Duration
    if(durationSecond)
      durationEL.textContent = `${durationMinute}:${durationSecond}`;
    
    // Calculate display
    const currentMinute = Math.floor(currentTime / 60); 
    let currentSecond = Math.floor(currentTime%60);
    if(currentSecond<10){
      currentSecond = `0${currentSecond}`;
    }
    currTimeEL.textContent = `${currentMinute}:${currentSecond}`
  }
}

function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = music;
  music.currentTime = (clickX/width) * duration;
}

// Event Listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);