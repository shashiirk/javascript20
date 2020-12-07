const circle = document.querySelector('.circle');
const text = document.querySelector('.text');
const totalTime = 9000;
const breatheTime = 3500;
const holdTime = 1000;

// Set text message
function setText(message) {
  text.textContent = message;
  text.style.opacity = 1;

  setTimeout(() => {
    text.style.opacity = 0;
  }, breatheTime + 400);
}

// Breathe animation
function breathe() {
  setTimeout(() => {
    // Expand action
    circle.classList.remove('compress');
    circle.classList.add('expand');
    setText('deep breath in');
    setTimeout(() => {
      setTimeout(() => {
        // Compress action
        circle.classList.remove('expand');
        circle.classList.add('compress');
        setText('long breath out');
      }, breatheTime);
    }, holdTime);
  }, holdTime);
}

// Breathe on load
breathe();
// Call breathe() periodically
setInterval(breathe, totalTime);
