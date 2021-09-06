let myLibrary = [];

//// Get the container div from html
let booksContainer = document.getElementById("books-container");

//// Constructor for the book's object.
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + " by " + author + ", " + pages + " pages, " + read + ".";
  };
}

//// Push a new book object with the user's info to the lib array.
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read)
    myLibrary.push(book);
}

//// Sort the library array and show each object in the page.
function showArray() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let card = document.createElement("div");
    let titleInfo = document.createElement("p");
    let authorInfo = document.createElement("p");
    let pagesInfo = document.createElement("p");
    titleInfo.textContent = book.title;
    authorInfo.textContent = book.author;
    pagesInfo.textContent = book.pages;
    card.append(titleInfo, authorInfo, pagesInfo);
    card.setAttribute("class", "card");
    booksContainer.appendChild(card);

  }
}
addBookToLibrary("El Trasero", "El Damian", "1", "no");
showArray();
console.log(myLibrary)