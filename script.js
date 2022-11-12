const addBookPlus = document.getElementById('add-book-button');

const bookFormContainer = document.getElementById('book-form-container')
const bookFormWrapper = document.getElementById('book-form-wrapper')
const bookFormInputs = document.querySelectorAll('#book-form > input')
const bookFormH2 = document.getElementById('book-form-h2')
const bookFormIsbn = document.getElementById('book-form-isbn')
const bookFormTitle = document.getElementById('book-form-title')
const bookFormAuthor = document.getElementById('book-form-author')
const bookFormPagesRead = document.getElementById('book-form-pages-read')
const bookFormPagesTotal = document.getElementById('book-form-pages-total')
const bookFormRead = document.getElementById('book-form-read')
const bookFormSubmit = document.getElementById('book-form-submit');

const bookshelf = document.getElementById('bookshelf');
const books = document.querySelectorAll('.book');   //inutile pour l'instant

let myLibrary = [];

let arrayRef = 0;
/*
used to set a data-arrayref to the div.book
goal is to use data-arrayref value to fill the form wih the array values when modifying existing books
*/

//temp values for test
addBookToLibrary('one', 'two', 3, true);
addBookToLibrary('five', 'six', 7, false);
addBookToLibrary('nine', 'ten', 11, true)

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

//show or hide book form
function toggleHiddenBookForm(){
    resetForm()
    bookFormContainer.classList.toggle('hidden')
    bookFormWrapper.classList.toggle('hidden')
}

//reset form
function resetForm(){
    bookFormIsbn.value = ""
    bookFormTitle.value = "";
    bookFormAuthor.value = "";
    bookFormPagesRead.value = "";
    bookFormPagesTotal.value = ""
    bookFormRead.checked = false;
    document.querySelectorAll('#book-form > input').forEach((element) => element.classList.remove('form-ok'));
    document.querySelectorAll('#book-form > input').forEach((element) => element.classList.remove('form-error'));
}

//click on add book button
addBookPlus.addEventListener('click', () =>{
    bookFormH2.textContent = 'Add book'
    toggleHiddenBookForm();
    bookFormInputs.forEach(input => {
        input.removeAttribute('readonly')
    })
})





//click on individual book element
function openBook(event){
    bookFormH2.textContent = 'Edit book'
    toggleHiddenBookForm();

    let bookArrayRef = event.target.closest('.book').getAttribute('data-arrayref')    
    addExistingBookValues(bookArrayRef)
    bookFormInputs.forEach(input => {
        input.setAttribute('readonly', 'true')
    })
    // element.target.remove();
}

function addExistingBookValues(bookArrayRef){
    console.log(bookArrayRef)
    console.log(myLibrary[bookArrayRef].title)
}





//click on form container (background)
bookFormContainer.addEventListener('click', () =>{
    toggleHiddenBookForm();
})

//listen for form submit
bookFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let w = checkValidity(bookFormTitle);
    let x = checkValidity(bookFormAuthor);
    let y = checkValidity(bookFormPagesRead);
    let z = checkValidity(bookFormPagesTotal)
    if(!w || !x || !y || !z) return;
    addBookToLibrary(bookFormTitle.value, bookFormAuthor.value, bookFormPagesRead.value, bookFormRead.checked);
    addBookToBookshelf(myLibrary[myLibrary.length-1])
    toggleHiddenBookForm();
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

    bookDiv.setAttribute('data-arrayref', arrayRef)
    arrayRef++;

    bookCoverDiv = document.createElement('div')
    bookCoverDiv.className = 'book-cover';

    bookCoverImg = document.createElement('img')
    bookCoverImg.src = 'https://picsum.photos/100/150';  //modify later
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
    
    //listen for click on bookDiv
    bookDiv.addEventListener('click', openBook);

    bookshelf.appendChild(bookDiv);
    bookDiv.appendChild(bookCoverDiv);
    bookCoverDiv.appendChild(bookCoverImg);
    bookDiv.appendChild(bookTitleSpan)
    bookDiv.appendChild(bookAuthorSpan)
    bookDiv.appendChild(bookPageCountDiv)
    bookPageCountDiv.appendChild(bookPageReadSpan)
    bookPageCountDiv.insertAdjacentText('beforeend', ' / ');
    bookPageCountDiv.appendChild(bookPageTotalSpan)
}






// If you listen to your parent element where your newly generated children elements will be standing on, that will work.  Please check propagation, event bubbling and event delegation. 
