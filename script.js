const addBookPlus = document.getElementById('add-book-button');
const addBookContainer = document.getElementById('add-book-container')
const formWrapper = document.getElementById('form-wrapper')
const newbookTitle = document.getElementById('newbook-title')
const newbookAuthor = document.getElementById('newbook-author')
const newbookPages = document.getElementById('newbook-pages')
const newbookRead = document.getElementById('newbook-read')
const newbookSubmit = document.getElementById('newbook-submit');



function toggleHiddenClass(){
    addBookContainer.classList.toggle('hidden')
    formWrapper.classList.toggle('hidden')
    resetForm();
}

function resetForm(){
    newbookTitle.value = "";
    newbookAuthor.value = "";
    newbookPages.value = "";
    newbookRead.checked = false;
    document.querySelectorAll('#newbook-form > input').forEach((element) => element.classList.remove('form-ok'));
    document.querySelectorAll('#newbook-form > input').forEach((element) => element.classList.remove('form-error'));
}

addBookPlus.addEventListener('click', () =>{
    toggleHiddenClass();
})

addBookContainer.addEventListener('click', () =>{
    toggleHiddenClass();
})


let myLibrary = [];

//Book object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Create new book function
function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(myLibrary);
}




// on en est ici !


function checkValidity(element){
    if (!element.value){
        element.classList.remove ('form-ok')
        element.classList.add('form-error')
        return false;
    }else{
        element.classList.remove('form-error')
        element.classList.add('form-ok')
        return true;
    }
}


newbookSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let x = checkValidity(newbookTitle);
    let y = checkValidity(newbookAuthor);
    let z = checkValidity(newbookPages);
    if(!x || !y || !z) return;
    addBookToLibrary(newbookTitle.value, newbookAuthor.value, newbookPages.value, newbookRead.checked);
    toggleHiddenClass();
})



//loop through myLibrary and display in cards