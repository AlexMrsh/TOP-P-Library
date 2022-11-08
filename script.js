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


//loop through myLibrary and display in cards