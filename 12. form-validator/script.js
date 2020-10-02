const form = document.getElementById('form');
const password1El = document.getElementById('password1El')
const password2El = document.getElementById('password2El')
const messgaeContainer = document.querySelector('.message-container')
const message = document.getElementById('message');

let isValid = false;
let passwordMatch = false;

function validateForm(){
  // Using Constraint
  isValid = form.checkValidity();

  // Style Main Message 
  if(!isValid){
    message.textContent = 'Please fill out all fields';
    message.style.color = 'red'
    messgaeContainer.style.borderColor = 'red';
    return;
  }
  // Check if password Match
  if(password1El.value === password2El.value){
    passwordMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
  }
  else{
    passwordMatch = false;
    message.textContent = 'Make Sure Passwords Match';
    message.style.color = 'red';
    messgaeContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
  }
  // if form is valid and passwords match
  if(isValid && passwordMatch){
    message.textContent = 'You are Registered:)'
    message.style.color ='green';
    messgaeContainer.style.borderColor = 'green';
  }
}

function storeForm(){
  const user = {
    name : form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  }
}

function processForm(e){
  console.log(e)
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit if valid
  if(isValid && passwordMatch){
    storeForm();
  }
}

// Event Listener
form.addEventListener('submit',processForm);