const addBookPlus = document.getElementById('add-book-button');
const addBookContainer = document.getElementById('add-book-container')
const formWrapper = document.getElementById('form-wrapper')
const newbookTitle = document.getElementById('newbook-title')
const newbookAuthor = document.getElementById('newbook-author')
const newbookPages = document.getElementById('newbook-pages')
const newbookRead = document.getElementById('newbook-read')
const newbookSubmit = document.getElementById('newbook-submit');
const bookshelf = document.getElementById('bookshelf');
const books = document.querySelectorAll('.book');   //inutile pour l'instant

let myLibrary = [];

//temp values for test
addBookToLibrary('one', 'two', 3, true);
addBookToLibrary('five', 'six', 7, false);

//Book object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//load books on load
function loadExistingBooks(){
    myLibrary.forEach((object) => {
        addBookToBookshelf(object);
    })
}

loadExistingBooks();

//show or hide newbook form
function toggleHiddenClass(){
    addBookContainer.classList.toggle('hidden')
    formWrapper.classList.toggle('hidden')
    resetForm();
}

//reset form when closed
function resetForm(){
    newbookTitle.value = "";
    newbookAuthor.value = "";
    newbookPages.value = "";
    newbookRead.checked = false;
    document.querySelectorAll('#newbook-form > input').forEach((element) => element.classList.remove('form-ok'));
    document.querySelectorAll('#newbook-form > input').forEach((element) => element.classList.remove('form-error'));
}

//listen for form open or close
addBookPlus.addEventListener('click', () =>{
    toggleHiddenClass();
})
addBookContainer.addEventListener('click', () =>{
    toggleHiddenClass();
})

//listen for form submit
newbookSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let x = checkValidity(newbookTitle);
    let y = checkValidity(newbookAuthor);
    let z = checkValidity(newbookPages);
    if(!x || !y || !z) return;
    addBookToLibrary(newbookTitle.value, newbookAuthor.value, newbookPages.value, newbookRead.checked);
    addBookToBookshelf(myLibrary[myLibrary.length-1])
    toggleHiddenClass();
})

//check form validity
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

//Add form input to myLibrary array
function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

//create book grid element and add values of the last array object
function addBookToBookshelf(object){
    console.log(object)
    bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    bookCoverDiv = document.createElement('div')
    bookCoverDiv.className = 'book-cover';

    bookCoverImg = document.createElement('img')
    bookCoverImg.src = 'https://picsum.photos/100/150';
    bookCoverImg.alt = 'book cover';

    bookTitleSpan = document.createElement('span');
    bookTitleSpan.className = 'book-title';

    bookAuthorSpan = document.createElement('span');
    bookAuthorSpan.className = 'book-author';

    bookPageCountDiv = document.createElement('div');
    bookPageCountDiv.className = 'page-count';

    bookPageReadSpan = document.createElement('span')
    bookPageReadSpan.className = 'page-read'
    
    bookPageTotalSpan = document.createElement('span')
    bookPageTotalSpan.className = 'page-total'

    bookTitleSpan.textContent = object.title
    bookAuthorSpan.textContent = object.author
    bookPageReadSpan.textContent = object.pages    //modify later
    bookPageTotalSpan.textContent = object.pages   //modify later

    //listen for click
    
    bookshelf.appendChild(bookDiv);
    bookDiv.appendChild(bookCoverDiv);
    bookCoverDiv.appendChild(bookCoverImg);
    bookDiv.appendChild(bookTitleSpan)
    bookDiv.appendChild(bookAuthorSpan)
    bookDiv.appendChild(bookPageCountDiv)
    bookPageCountDiv.appendChild(bookPageReadSpan)
    bookPageCountDiv.insertAdjacentText('beforeend', ' / ');
    bookPageCountDiv.appendChild(bookPageTotalSpan)
    bookDiv.addEventListener('click', openBook);
}

//open book element content
function openBook(element){
    console.log(element.target);
    element.target.remove();
}



// If you listen to your parent element where your newly generated children elements will be standing on, that will work.  Please check propagation, event bubbling and event delegation. 
