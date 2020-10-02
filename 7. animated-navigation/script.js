const menuBars = document.getElementById('menu-bar');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1,nav2,nav3,nav4,nav5];

// Control Navigation
function navAmination(dir1,dir2){
  navItems.forEach((nav,index)=>{
    nav.classList.replace(`slide-${dir1}-${index+1}`,`slide-${dir2}-${index+1}`)
  })
}

function toggleNav(){
  // Menu Bars Open/Closed
  menuBars.classList.toggle('change')
  // Toggle Menu
  overlay.classList.toggle('overlay-active')
  if(overlay.classList.contains('overlay-active')){
    // Animate In
    overlay.classList.replace('overlay-slide-left','overlay-slide-right');
    // Animate In Nav Item
    navAmination('out','in');
  }else {
    // Animate Out
    overlay.classList.replace('overlay-slide-right','overlay-slide-left');
    // Animate Out Nav Item
    navAmination('in','out');
  }


}

// Add Event Listeners
menuBars.addEventListener('click',toggleNav);
navItems.forEach(nav => {
  nav.addEventListener('click',toggleNav);
})