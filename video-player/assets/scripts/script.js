const video = document.getElementById('video');
const play = document.getElementById('play');
const expand = document.getElementById('expand');
const progress = document.getElementById('progress');
const timerBar = document.getElementById('timerBar');
const timer = document.getElementById('timer');
const container = document.querySelector('.container');
const videoBox = document.querySelector('.video-box');
const controls = document.querySelector('.controls');

// Play and pause video
function playPauseMedia() {
  if (video.paused) {
    video.play();
    setTimeout(function () {
      controls.classList.add('hide');
    }, 500);
  } else {
    video.pause();
    controls.classList.remove('hide');
  }
}

// Toggle the visibility of control section accordingly
function toggleControlVisibility(ev) {
  if (ev.type === 'mouseenter') {
    controls.classList.remove('hide');
  } else {
    if (!video.paused) {
      setTimeout(function () {
        controls.classList.add('hide');
      }, 500);
    }
  }
}

// Update play and pause icon according to current video state
function updatePlayPauseIcon() {
  if (video.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar and timer
function updateVideoProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Progress video on change in progress bar
function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

// Reset video to initial state
function resetVideo() {
  video.currentTime = 0;
}

// Toggle full screen
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    videoBox.requestFullscreen();
    expand.classList.remove('fa-expand');
    expand.classList.add('fa-compress');
    document.querySelector('.heading').style.display = 'none';
    controls.classList.remove('hide');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      expand.classList.remove('fa-compress');
      expand.classList.add('fa-expand');
      document.querySelector('.heading').style.display = 'block';
    }
  }
}

// Event listeners for video element
video.addEventListener('click', playPauseMedia);
video.addEventListener('play', updatePlayPauseIcon);
video.addEventListener('pause', updatePlayPauseIcon);
video.addEventListener('timeupdate', updateVideoProgress);
video.addEventListener('ended', resetVideo);

// Event listener for play icon
play.addEventListener('click', playPauseMedia);

// Event listeners for progress bar
progress.addEventListener('click', setVideoProgress);
progress.addEventListener('change', setVideoProgress);

// Event listener for expand icon
expand.addEventListener('click', toggleFullScreen);

// Event listeners for controls element
controls.addEventListener('mouseenter', toggleControlVisibility);
controls.addEventListener('mouseleave', toggleControlVisibility);
