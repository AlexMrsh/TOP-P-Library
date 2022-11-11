const addBookPlus = document.getElementById('add-book-button');
const newbookContainer = document.getElementById('newbook-container')
const newbookFormWrapper = document.getElementById('newbook-form-wrapper')
const newbookTitle = document.getElementById('newbook-title')
const newbookAuthor = document.getElementById('newbook-author')
const newbookPages = document.getElementById('newbook-pages')
const newbookRead = document.getElementById('newbook-read')
const newbookSubmit = document.getElementById('newbook-submit');

const editbookContainer = document.getElementById('editbook-container')
const editbookFormWrapper = document.getElementById('editbook-form-wrapper')

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
function toggleHiddenAddbook(){
    newbookContainer.classList.toggle('hidden')
    newbookFormWrapper.classList.toggle('hidden')
    resetForm();
}

//show or hide editbook form
function toggleHiddenEditbook(){
    editbookContainer.classList.toggle('hidden')
    editbookFormWrapper.classList.toggle('hidden')
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
    toggleHiddenAddbook();
})
newbookContainer.addEventListener('click', () =>{
    toggleHiddenAddbook();
})
editbookContainer.addEventListener('click', () =>{
    toggleHiddenEditbook();
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
    toggleHiddenAddbook();
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
    bookTitleSpan.textContent = object.title

    bookAuthorSpan = document.createElement('span');
    bookAuthorSpan.className = 'book-author';
    bookAuthorSpan.textContent = object.author

    bookPageCountDiv = document.createElement('div');
    bookPageCountDiv.className = 'page-count';

    bookPageReadSpan = document.createElement('span')
    bookPageReadSpan.className = 'page-read'
    bookPageReadSpan.textContent = object.pages    //modify later
    
    bookPageTotalSpan = document.createElement('span')
    bookPageTotalSpan.className = 'page-total'
    bookPageTotalSpan.textContent = object.pages   //modify later

    // test
    bookButtonsDiv = document.createElement('div')
    bookButtonsDiv.className = 'book-buttons'

    bookButtonRead = document.createElement('input');
    bookButtonRead.type = 'checkbox'
    bookButtonRead.checked = object.read
    bookButtonRead.className = 'button-read'
    bookButtonRead.textContent = 'Read'

    bookButtonEdit = document.createElement('button')
    bookButtonEdit.className = 'button-edit'
    bookButtonEdit.textContent = 'Edit'
    
    //listen for click on bookDiv
    bookDiv.addEventListener('click', openBook);
    bookButtonRead.addEventListener('click', markAsRead)
    bookButtonEdit.addEventListener('click', editBook)

    bookshelf.appendChild(bookDiv);
    bookDiv.appendChild(bookCoverDiv);
    bookCoverDiv.appendChild(bookCoverImg);
    bookDiv.appendChild(bookTitleSpan)
    bookDiv.appendChild(bookAuthorSpan)
    bookDiv.appendChild(bookPageCountDiv)
    bookPageCountDiv.appendChild(bookPageReadSpan)
    bookPageCountDiv.insertAdjacentText('beforeend', ' / ');
    bookPageCountDiv.appendChild(bookPageTotalSpan)
    bookDiv.appendChild(bookButtonsDiv)
    bookButtonsDiv.appendChild(bookButtonRead)
    bookButtonsDiv.appendChild(bookButtonEdit)

}

//open book element content
function openBook(element){
    element.stopPropagation();
    console.log(element.target);
    // element.target.remove();
}

//mark book as read
function markAsRead(element){
    element.stopPropagation();
    console.log('read')
}

function editBook(element){
    element.stopPropagation();
    toggleHiddenEditbook();
    console.log('edit')
}




// If you listen to your parent element where your newly generated children elements will be standing on, that will work.  Please check propagation, event bubbling and event delegation. 
