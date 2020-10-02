const videoElement = document.getElementById('video')
const button = document.getElementById('startBtn')

// Prompt to select media stream, pass element, play
async function selectMediaStream(){
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () =>{
      videoElement.play();
    }
  } catch (error) {
    console.log(error)
  }
}

button.addEventListener('click', async () =>{
  // Disable Button
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  // Reset
  button.disable = false;
})

// On Load
selectMediaStream();