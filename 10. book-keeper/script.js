const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmark-container');

let bookmarks = {};

function showModal(){
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

function storeBookmark(e){
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if(!urlValue.includes('https://','http://')){
    urlValue = `https://${urlValue}`;
  }
  if(!validateValue(nameValue,urlValue)){
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks[urlValue] = bookmark;
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Validate Form
function validateValue(nameValue,urlValue){
  const exp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
  const regex = new RegExp(exp);
  if(!nameValue || !urlValue){
    alert('Please Input Something')
    return false;
  }
  if(!urlValue.match(regex)){
    alert('Please Provide A Valid Web')
    return false
  }
  return true;
}

// Build Bookmarks
function buildBookmark(){
  // Remove All Bookmark First
  bookmarkContainer.textContent='';
  Object.keys(bookmarks).forEach((id)=>{
    const {name,url} = bookmarks[id];
    // Item Div
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas','fa-times');
    closeIcon.setAttribute('title','Delete Bookmark');
    closeIcon.setAttribute('onclick',`deleteBookmark('${id}')`);
    // Favicon Info
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src',`http://www.google.com/s2/u/0/favicons?domain=${url}`);
    favicon.setAttribute('alt','Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href',`${url}`);
    link.setAttribute('target','_blank');
    link.textContent = name;

    // Add Bookmark To Container
    linkInfo.append(favicon,link);
    item.append(closeIcon,linkInfo);
    bookmarkContainer.append(item);
  })

}

// Delete Bookmark
function deleteBookmark(url){
  // bookmarks.forEach((bookmark,index)=>{
  //   if(bookmark.url === url)
  //     bookmarks.splice(index,1,);
  // })
  if(bookmarks[url]){
    delete bookmarks[url];
  }

  // update bookmark
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Fetch Bookmark
function fetchBookmarks(){
  // Get Bookmarks
  if(localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
  else{
    const id = `https://google.com`
    bookmarks[id]={
      name:'Rad Design',
      url : 'https://google.com'
    }

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  buildBookmark();
}


// Event Listener
modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click',()=>modal.classList.remove('show-modal'));
window.addEventListener('click',(e)=> (e.target=== modal? modal.classList.remove('show-modal') : false));
bookmarkForm.addEventListener('submit',storeBookmark);

// On load Fetch Bookmarks
fetchBookmarks();
