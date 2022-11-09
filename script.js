const addBookPlus = document.getElementById('add-book-button');
const addBookContainer = document.getElementById('add-book-container')
const formWrapper = document.getElementById('form-wrapper')

const toggleNewbookForm = function(){
    addBookContainer.classList.toggle('hidden')
    formWrapper.classList.toggle('hidden')
}

addBookPlus.addEventListener('click', () =>{
    toggleNewbookForm();
})

addBookContainer.addEventListener('click', () =>{
    toggleNewbookForm();
})

let myLibrary = [{}];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push({title, author, pages, read})
    console.log(myLibrary)
}

const newbookTitle = document.getElementById('newbook-title')
const newbookAuthor = document.getElementById('newbook-author')
const newbookPages = document.getElementById('newbook-pages')
const newbookRead = document.getElementById('newbook-read')
const newbookSubmit = document.getElementById('newbook-submit');


// on en est ici !


const checkValidity = function(element){
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
    checkValidity(newbookTitle);
    checkValidity(newbookAuthor);
    checkValidity(newbookPages);
    
    checkValidity()
    if(!newbookTitle.value || !newbookAuthor.value || !newbookPages.value){
        (!newbookTitle.value) ? formError(newbookTitle);
        if (!newbookAuthor.value) formError(newbookAuthor);
        if (!newbookPages.value) formError(newbookPages);
        return;
    }
    
    addBookToLibrary(newbookTitle, newbookAuthor, newbookPages, newbookRead);
    toggleNewbookForm();
    
})


//loop through myLibrary and display in cards