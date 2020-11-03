const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.querySelector('button');
const firstNameErrorMsg = 'Please enter your first name';
const firstNameErrorMsg2 = 'Please enter a valid first name';
const lastNameErrorMsg = 'Please enter your last name';
const lastNameErrorMsg2 = 'Please enter a valid last name';
const emailErrorMsg1 = 'Please enter an email address';
const emailErrorMsg2 = 'Please enter a valid email address';
const passwordErrorMsg1 = 'Please enter a password';
const passwordErrorMsg2 = 'Passwords must contain at least 6 characters';
let firstValidation = true;

function regexTest(str) {
  const pattern = /^[A-Za-z]+$/;
  return pattern.test(str);
}

function validateFirstName() {
  const firstNameValue = firstName.value.trim();
  const firstNamePrevious = firstName.previousElementSibling;
  const firstNameParent = firstName.parentElement;
  const regexTestPassed = regexTest(firstNameValue);

  if (firstNameValue === '') {
    firstNamePrevious.textContent = firstNameErrorMsg;
    firstNameParent.classList.add('error');
  } else {
    if (!regexTestPassed) {
      firstNamePrevious.textContent = firstNameErrorMsg2;
      firstNameParent.classList.add('error');
    } else {
      firstNameParent.classList.remove('error');
    }
  }

  if (firstValidation) {
    firstName.addEventListener('input', validateFirstName);
  }
}

function validateLastName() {
  const lastNameValue = lastName.value.trim();
  const lastNamePrevious = lastName.previousElementSibling;
  const lastNameParent = lastName.parentElement;
  const regexTestPassed = regexTest(lastNameValue);

  if (lastNameValue === '') {
    lastNamePrevious.textContent = lastNameErrorMsg;
    lastNameParent.classList.add('error');
  } else {
    if (!regexTestPassed) {
      lastNamePrevious.textContent = lastNameErrorMsg2;
      lastNameParent.classList.add('error');
    } else {
      lastNameParent.classList.remove('error');
    }
  }

  if (firstValidation) {
    lastName.addEventListener('input', validateLastName);
  }
}

function checkEmailFormat(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

function validateEmail() {
  const emailValue = email.value.trim();
  const emailPrevious = email.previousElementSibling;
  const emailParent = email.parentElement;

  if (emailValue === '') {
    emailPrevious.textContent = emailErrorMsg1;
    emailParent.classList.add('error');
  } else {
    const isEmailValid = checkEmailFormat(emailValue);
    if (isEmailValid) {
      emailParent.classList.remove('error');
    } else {
      emailPrevious.textContent = emailErrorMsg2;
      emailParent.classList.add('error');
    }
  }

  if (firstValidation) {
    email.addEventListener('input', validateEmail);
  }
}

function validatePassword() {
  const passwordValue = password.value.trim();
  const passwordPrevious = password.previousElementSibling;
  const passwordParent = password.parentElement;

  if (
    passwordValue === '' ||
    (passwordValue.length > 0 && passwordValue.length < 6)
  ) {
    if (passwordValue === '') {
      passwordPrevious.textContent = passwordErrorMsg1;
    } else {
      passwordPrevious.textContent = passwordErrorMsg2;
    }
    passwordParent.classList.add('error');
  } else {
    passwordParent.classList.remove('error');
  }

  if (firstValidation) {
    password.addEventListener('input', validatePassword);
  }
}

function validateFormHandler() {
  validateFirstName();
  validateLastName();
  validateEmail();
  validatePassword();
  firstValidation = false;
}

submitBtn.addEventListener('click', validateFormHandler);
