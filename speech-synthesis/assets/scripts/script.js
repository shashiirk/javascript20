const voiceSelect = document.getElementById('voices');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const text = document.getElementById('text');
const stopBtn = document.getElementById('stop');
const speakBtn = document.getElementById('speak');
// Built-in object for speech API
const synth = window.speechSynthesis;
// List of available voices
let voices = [];

// Fetch available voices and populate them in the voiceSelect
function populateVoices() {
  // Fetch available voices
  voices = synth.getVoices();
  // Filter for only english voices
  voices = voices.filter((value) => value.lang.includes('en'));
  // Create an option element for each voice in voices
  voices.forEach((value) => {
    const option = document.createElement('option');
    option.textContent = value.name;
    option.setAttribute('data-name', value.name);
    // Append this element to the voiceSelect
    voiceSelect.append(option);
  });
}

// Stops the speaking voice
function stopHandler() {
  synth.cancel();
}

// Configure speak action and speak
function speakHanlder() {
  // Object for speech synthesis
  const utterThis = new SpeechSynthesisUtterance(text.value);
  // Get the voice selected by the user
  const selectedOption = voiceSelect.selectedOptions[0].getAttribute(
    'data-name'
  );

  // Configure the voice by setting up it's required values
  utterThis.voice = voices.find((value) => value.name === selectedOption);
  utterThis.rate = rate.value;
  utterThis.pitch = pitch.value;
  // Function that performs speak action
  synth.speak(utterThis);
}

// Fill slided area of the range track with a color
function fillRangeTrack(slider) {
  const currentValue = parseFloat(slider.value);
  const maxValue = parseFloat(slider.getAttribute('max'));
  // Find slided area width percentage
  const percentage = (currentValue / maxValue) * 100;
  const bg = `linear-gradient(90deg, #003366 ${percentage}%, #c2c2c2 ${percentage}%)`;
  slider.style.background = bg;
}

// Update rate when slider moved
function updateRate() {
  rateValue.textContent = rate.value;
  fillRangeTrack(rate);
  // Speak in new pitch when pitch changed in between speaking
  if (synth.speaking) {
    toggleVoice();
  }
}

// Update pitch when slider moved
function updatePitch() {
  pitchValue.textContent = pitch.value;
  fillRangeTrack(pitch);
  // Speak in new pitch when pitch changed in between speaking
  if (synth.speaking) {
    toggleVoice();
  }
}

function toggleVoice() {
  // Checks if voice is speaking
  if (synth.speaking) {
    // Cancel current voice
    synth.cancel();
    // Speak with new configuration
    speakHanlder();
  }
}

// If page is reloaded while speaking then cancel that voice
function pageReloadHandler() {
  // Checks if voice is speaking
  if (synth.speaking) {
    // Cancel current voice
    synth.cancel();
  }
}

// Initially on page load
fillRangeTrack(rate);
fillRangeTrack(pitch);
populateVoices();

// Event listeners
voiceSelect.addEventListener('change', toggleVoice);
rate.addEventListener('input', updateRate);
pitch.addEventListener('input', updatePitch);
stopBtn.addEventListener('click', stopHandler);
speakBtn.addEventListener('click', speakHanlder);
synth.addEventListener('voiceschanged', populateVoices);
window.addEventListener('beforeunload', pageReloadHandler);
