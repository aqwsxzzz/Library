let myLibrary = [];

//// Get the container div from html
let booksContainer = document.getElementById("books-container");

//// Create and link "NEW BOOK" button and container.
let newBookButtonContainer = document.createElement("div");
newBookButtonContainer.setAttribute("id", "new-book-button-container");
let newBookButton = document.createElement("button");
newBookButton.textContent = "New Book";
newBookButton.setAttribute("id", "new-book-button");
booksContainer.appendChild(newBookButtonContainer);
newBookButtonContainer.appendChild(newBookButton);

//// Set the form visible in the html document.
newBookButton.addEventListener("click", () => {
  form.style.display = "block";
});

//// Create form and set it display: none.
let form = document.createElement("form");
let titleInput = document.createElement("input");
let authorInput = document.createElement("input");
let pagesInput = document.createElement("input");
let readLabel = document.createElement("label");
readLabel.textContent = "Readed?";
let readInput = document.createElement("select");
let readSelector = document.createElement("option");
readSelector.textContent = "Read";
let unreadSelector = document.createElement("option");
unreadSelector.textContent = "Unread";
readInput.append(readSelector, unreadSelector);
let closeFormButton = document.createElement("button");
closeFormButton.textContent = "Add";
form.append(
  titleInput,
  authorInput,
  pagesInput,
  readLabel,
  readInput,
  closeFormButton
);
booksContainer.appendChild(form);
form.style.display = "none";

//// Disables form again and send input info to the constructor.
closeFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.value
  );
  form.style.display = "none";
  let book = {
    title: titleInput.value,
    author: authorInput.value,
    pages: pagesInput.value,
    read: readInput.value,
  };
  addCard(book);
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.value = "";
  readCounter = 0;
  unreadCounter = 0;
  removeCards();
  showArray();
  displayRefresher();
});

//// Constructor for the book's object.
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.readStatus = function () {
    if (read === "Read") {
      readCounter += 1;
    } else unreadCounter += 1;
  };
}

//// Push a new book object with the user's info to the library array.
function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}
//// Remove the existing cards.
let removeCards = function () {
  for (let j = 0; j < myLibrary.length; j++) {
    let x = document.getElementById("card1");
    x.remove();
  }
};
//// Sort the library array and show each object in the page.
function showArray() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    addCard(book);
    if (myLibrary[i].read === "Unread") {
      unreadCounter += 1;
    } else readCounter += 1;
  }
}

//// Create the html "Card" for an object.
let cardsContainer = document.createElement("div");
cardsContainer.setAttribute("class", "cards-container");
function addCard(book) {
  let upperContainer = document.createElement("div");
  upperContainer.setAttribute("id", "upper-container");
  let bottomContainer = document.createElement("div");
  bottomContainer.setAttribute("id", "bottom-container");
  let leftContainer = document.createElement("div");
  leftContainer.setAttribute("id", "left-container");
  let rightContainer = document.createElement("div");
  rightContainer.setAttribute("id", "right-container");
  let card = document.createElement("div");
  card.setAttribute("id", "card1");
  let titleInfo = document.createElement("p");
  titleInfo.textContent = "Title: " + book.title;
  titleInfo.setAttribute("id", "title-info");
  let authorInfo = document.createElement("p");
  authorInfo.textContent = "Author: " + book.author;
  authorInfo.setAttribute("id", "author-info");
  let pagesInfo = document.createElement("p");
  pagesInfo.textContent = "Pages: " + book.pages;
  let deleteButton = document.createElement("button");
  let xP = document.createElement("p");
  xP.textContent = "X"
  deleteButton.appendChild(xP);
  deleteButton.setAttribute("id", "delete-button");
  let readStatus = document.createElement("button");
  if (book.read === "Unread") {
    readStatus.textContent = "Unread";
  } else readStatus.textContent = "Read";
  readStatus.addEventListener("click", () => {
    if (readStatus.textContent === "Unread") {
      readStatus.textContent = "Read";
      book.read = "Read";
    } else {
      readStatus.textContent = "Unread";
      book.read = "Unread";
    }
    readCounter = 0;
    unreadCounter = 0;
    removeCards();
    showArray();
    displayRefresher();
  });
  readStatus.setAttribute("id", "status-button");
  card.append(upperContainer, bottomContainer);
  card.setAttribute("class", "card");
  upperContainer.append(leftContainer, rightContainer)
  leftContainer.append(titleInfo, authorInfo, pagesInfo);
  rightContainer.appendChild(deleteButton)
  bottomContainer.appendChild(readStatus);
  cardsContainer.appendChild(card);
  booksContainer.appendChild(cardsContainer);
  deleteButton.addEventListener("click", () => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (book.title === myLibrary[i].title) {
        myLibrary.splice(i, 1);
        card.remove();
        readCounter = 0;
        unreadCounter = 0;
        removeCards();
        showArray();
        displayRefresher();
        return;
      }
    }
  });
}

//// Display the info container data.
let infoContainer = document.getElementById("info-container");
let readCounter = 0;
let unreadCounter = 0;
let booksDisplay = document.createElement("p");
let readDisplay = document.createElement("p");
let unreadDisplay = document.createElement("p");
function displayRefresher() {
  booksDisplay.textContent = "Books: " + myLibrary.length;
  readDisplay.textContent = "Read: " + readCounter;
  unreadDisplay.textContent = "Unread: " + unreadCounter;
  infoContainer.append(booksDisplay, readDisplay, unreadDisplay);
}

addBookToLibrary("El Trasero", "El Damian", "1", "Unread");
showArray();
displayRefresher();
