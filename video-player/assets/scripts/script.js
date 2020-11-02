const video = document.getElementById('video');
const play = document.getElementById('play');
const expand = document.getElementById('expand');
const progress = document.getElementById('progress');
const timerBar = document.getElementById('timerBar');
const timer = document.getElementById('timer');
const container = document.querySelector('.container');

function playPauseMedia() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayPauseIcon() {
  if (video.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

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

function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

function resetVideo() {
  video.currentTime = 0;
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    expand.classList.remove('fa-expand');
    expand.classList.add('fa-compress');
    container.classList.add('fullscreen');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      expand.classList.remove('fa-compress');
      expand.classList.add('fa-expand');
      container.classList.remove('fullscreen');
    }
  }
}

video.addEventListener('click', playPauseMedia);
video.addEventListener('play', updatePlayPauseIcon);
video.addEventListener('pause', updatePlayPauseIcon);
video.addEventListener('timeupdate', updateVideoProgress);
video.addEventListener('ended', resetVideo);
play.addEventListener('click', playPauseMedia);
progress.addEventListener('click', setVideoProgress);
progress.addEventListener('change', setVideoProgress);
expand.addEventListener('click', toggleFullScreen);
