const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.querySelector("button");
const firstNameErrorMsg = "Please enter your first name";
const lastNameErrorMsg = "Please enter your last name";
const emailErrorMsg1 = "Please enter an email address";
const emailErrorMsg2 = "Please enter a valid email address";
const passwordErrorMsg1 = "Please enter a password";
const passwordErrorMsg2 = "Passwords must contain at least 6 characters";

function validateFirstName() {
  const firstNameValue = firstName.value.trim();
  const firstNamePrevious = firstName.previousElementSibling;
  const firstNameParent = firstName.parentElement;

  if (firstNameValue === "") {
    firstNamePrevious.textContent = firstNameErrorMsg;
    firstNameParent.classList.add("error");
  } else {
    firstNameParent.classList.remove("error");
  }
}

function validateLastName() {
  const lastNameValue = lastName.value.trim();
  const lastNamePrevious = lastName.previousElementSibling;
  const lastNameParent = lastName.parentElement;

  if (lastNameValue === "") {
    lastNamePrevious.textContent = lastNameErrorMsg;
    lastNameParent.classList.add("error");
  } else {
    lastNameParent.classList.remove("error");
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

  if (emailValue === "") {
    emailPrevious.textContent = emailErrorMsg1;
    emailParent.classList.add("error");
  } else {
    const isEmailValid = checkEmailFormat(emailValue);
    if (isEmailValid) {
      emailParent.classList.remove("error");
    } else {
      emailPrevious.textContent = emailErrorMsg2;
      emailParent.classList.add("error");
    }
  }
}

function validatePassword() {
  const passwordValue = password.value.trim();
  const passwordPrevious = password.previousElementSibling;
  const passwordParent = password.parentElement;

  if (
    passwordValue === "" ||
    (passwordValue.length > 0 && passwordValue.length < 6)
  ) {
    if (passwordValue === "") {
      passwordPrevious.textContent = passwordErrorMsg1;
    } else {
      passwordPrevious.textContent = passwordErrorMsg2;
    }
    passwordParent.classList.add("error");
  } else {
    passwordParent.classList.remove("error");
  }
}

function validateFormHandler() {
  validateFirstName();
  validateLastName();
  validateEmail();
  validatePassword();
}

submitBtn.addEventListener("click", validateFormHandler);
