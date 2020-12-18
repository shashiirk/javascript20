const center = document.querySelector('.center');
const hint = document.querySelector('.hint');
const micBtn = document.querySelector('.mic');
const micOn = document.querySelector('.mic-on');
const micOff = document.querySelector('.mic-off');
// Used to remove hint text on first recognition
const firstRecognition = true;

// To support in multiple browsers
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
// Built-in object used for speech recognition
const recognition = new SpeechRecognition();
// To generate results while speaking and not before finishing speech
recognition.interimResults = true;

// Start recognition again after speech recognition service has disconnected until micBtn is on
function continueListening() {
  if (micOn.classList.contains('visible')) {
    recognition.start();
  }
}

// Scroll to the bottom
function scrollToBottom() {
  center.scrollTop = center.scrollHeight;
}

// Put recognised speech results in UI
function populateResult(ev) {
  // Recognise text content as a whole string
  const transcript = Array.from(ev.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  // Checks whether transcript is non empty
  if (transcript.length > 0 && ev.results[0].isFinal) {
    // New paragraph element
    const p = document.createElement('p');
    p.textContent = transcript;
    // Append paragraph to center
    center.append(p);
    // Each time a new element is added scroll to the bottom
    scrollToBottom();
    // On first recognition remove the hint text
    if (firstRecognition) {
      hint.remove();
      firstRecognition = false;
    }
  }
}

// Turn mic on/off
function toggleMic() {
  if (micOff.classList.contains('visible')) {
    micOff.classList.remove('visible');
    micOn.classList.add('visible');
    micBtn.classList.add('wave');
    recognition.start();
  } else {
    micOn.classList.remove('visible');
    micOff.classList.add('visible');
    micBtn.classList.remove('wave');
    recognition.stop();
  }
}

// Listen to click event on micBtn
micBtn.addEventListener('click', toggleMic);
// Fired when the speech recognition service returns a result
recognition.addEventListener('result', populateResult);
// Fired when the speech recognition service has disconnected.
recognition.addEventListener('end', continueListening);
