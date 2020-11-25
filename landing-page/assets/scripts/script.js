const navBtn1 = document.getElementById('nav-btn-1');
const icon = document.getElementById('icon');
const navigation = document.querySelector('.nav .links');
const backdrop = document.getElementById('backdrop');
const signupSection = document.getElementById('signup-section');

// Resets the form input values
function resetForm() {
  document.getElementById('fullname').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirm-password').value = '';
}

// Toggles the signup screen
function toggleSignupScreen() {
  if (signupSection.classList.contains('visible')) {
    resetForm();
  }

  signupSection.classList.toggle('visible');
  backdrop.classList.toggle('visible');
}

// Toggle navigation for smaller devices
function toggleNavigation(ev) {
  ev.stopPropagation();
  navigation.classList.toggle('visible');
}

// Close the navigation
function closeNavigation(ev) {
  if (
    navigation.classList.contains('visible') &&
    ev.target.closest('div') !== navigation
  ) {
    navigation.classList.remove('visible');
  }
}

// Event Listeners
navBtn1.addEventListener('click', toggleSignupScreen);
backdrop.addEventListener('click', toggleSignupScreen);
icon.addEventListener('click', toggleNavigation);
window.addEventListener('click', closeNavigation);
