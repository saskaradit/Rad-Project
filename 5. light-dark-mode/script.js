const switchToggle = document.querySelector('input[type=checkbox]');
const navbar = document.getElementById('navbar');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

function toggleMode(mode,remove,add){
  toggleIcon.children[0].textContent = `${mode} mode`;
  toggleIcon.children[1].classList.replace(`fa-${remove}`,`fa-${add}`);
  image1.src = `img/Designer_mindset_${mode}.svg`;
  image2.src = `img/Operating_system_${mode}.svg`;
  image3.src = `img/Photo_re_${mode}.svg`;
}

function darkMode(){
  navbar.style.backgroundColor = 'rgb(0 0 0 / 50%)'
  textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)'
  localStorage.setItem('theme','dark');
  toggleMode('dark','sun','moon');
}

function lightMode(){
  navbar.style.backgroundColor = 'rgb(255 255 255 / 50%)'
  textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  localStorage.setItem('theme','light');
  toggleMode('light','moon','sun')
}

// Switch Theme
function switchTheme(event){
  // console.log(event.target.checked);
  if(event.target.checked){
    document.documentElement.setAttribute('data-theme','dark');
    darkMode();
  }else{
    document.documentElement.setAttribute('data-theme','light')
    lightMode();
  }
}

// Event Listener
switchToggle.addEventListener('change',switchTheme);

// Check Local Storage
const localTheme = localStorage.getItem('theme');
if(localTheme){
  document.documentElement.setAttribute('data-theme',localTheme);
  if(localTheme==='dark'){
    switchToggle.checked = true;
    darkMode();
  }
}