let myLibrary = [];

//// Get the container div from html
let booksContainer = document.getElementById("books-container");

//// Create and link "NEW BOOK" button.
let newBookButton = document.createElement("button");
booksContainer.appendChild(newBookButton);
newBookButton.textContent = "New Book";

//// Set the form visible in the html document.
newBookButton.addEventListener("click", () => {
  form.style.display = "block";
})

//// Create form and set it display: none.
let form = document.createElement("form");
let titleInput = document.createElement("input");
let authorInput = document.createElement("input");
let pagesInput = document.createElement("input");
let closeFormButton = document.createElement("button");
closeFormButton.textContent = "Add";
form.append(titleInput, authorInput, pagesInput, closeFormButton);
booksContainer.appendChild(form);
form.style.display = "none";

//// Disables form again and send input info to the constructor.
closeFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, "none");
  form.style.display = "none";
  let book = {
    title: titleInput.value,
    author: authorInput.value,
    pages: pagesInput.value,
    read: "none",
  }
  addCard(book)
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
})

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

//// Push a new book object with the user's info to the library array.
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read)
    myLibrary.push(book);
}

//// Sort the library array and show each object in the page.
function showArray() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    addCard(book);
  }
}

//// Create the html "Card" for an object.
function addCard(book) {
  let card = document.createElement("div");
  let titleInfo = document.createElement("p");
  let authorInfo = document.createElement("p");
  let pagesInfo = document.createElement("p");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  titleInfo.textContent = book.title;
  authorInfo.textContent = book.author;
  pagesInfo.textContent = book.pages;
  card.append(titleInfo, deleteButton, authorInfo, pagesInfo);
  card.setAttribute("class", "card");
  booksContainer.appendChild(card);
  deleteButton.addEventListener("click", () => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (book.title === myLibrary[i].title) {
        myLibrary.splice(i, 1);
        return;
      }
    }
    card.remove();
  })
  
}
addBookToLibrary("El Trasero", "El Damian", "1", "no");
showArray();
