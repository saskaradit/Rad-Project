const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const columnLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}
getSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
  listArray = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
  const arrayNames = ['backlog','progress','complete','onHold'];
  arrayNames.forEach((name,index)=>{
    localStorage.setItem(`${name}Items`,JSON.stringify(listArray[index]));
  })
}

// Filter Array
function filterArray(array){
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart','drag(event)');
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout',`updateItem(${index},${column})`)
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if(!updatedOnLoad){
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((item,index)=>{
    createItemEl(backlogList,0,item,index);
  })
  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((item,index)=>{
    createItemEl(progressList,1,item,index);
  })
  progressListArray = filterArray(progressListArray);
  
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((item,index)=>{
    createItemEl(completeList,2,item,index);
  })
  completeListArray = filterArray(completeListArray);
  
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((item,index)=>{
    createItemEl(onHoldList,3,item,index);
  })
  onHoldListArray = filterArray(onHoldListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Update Item - Delete if Needed, aand also update Array
function updateItem(id,col){
  const selecetedArr = listArray[col];
  const selectedCol = columnLists[col].children;
  if(!dragging){
    if(!selecetedArr[id].textContent){
      delete selecetedArr[id];
    }else{
      selecetedArr[id] = selectedCol[id].textContent;
    }
    updateDOM();
  }
}


// Add To Column
function addToColumn(column){
  const itemText = addItems[column].textContent;
  const selectedArr = listArray[column];
  selectedArr.push(itemText);
  addItems[column].textContent = ''
  updateDOM();
}

// Show Add Item Input
function showInputBox(column){
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}
// Hide Input
function hideInputBox(column){
  addBtns[column].style.visibility = 'show';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// Allow Arrays to Change
function rebuildArr(){
  backlogListArray = Array.from(backlogList.children.map(item => item.textContent));
  progressListArray = Array.from(progressList.children.map(item => item.textContent));
  completeListArray = Array.from(completeList.children.map(item => item.textContent));
  onHoldListArray = Array.from(onHoldList.children.map(item => item.textContent));
  updateDOM();
}

// Dragged Item
function drag(event){
  draggedItem = event.target;
  // console.log(draggedItem);
  dragging = true;
}

// Item Enter Column Area
function dragEnter(column){
  columnLists[column].classList.add('over');
  currColumn = column;
}

// Column Allow Items to be dropped
function allowDrop(event){
  event.preventDefault();
}

// Dropping item in column
function drop(event){
  event.preventDefault();
  // Remove Bgcolor, padding
  columnLists.forEach(col =>{
    col.classList.remove('over');
  })
  // Add item to column
  const parentEl = columnLists[currColumn];
  parentEl.appendChild(draggedItem)
  dragging = false;
  rebuildArr();
}


// ON Load
updateDOM();

