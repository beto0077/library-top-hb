const cardsContainer = document.querySelector(".cards-container");
const newBookButton = document.querySelector(".new-book-button");
const bookForm = document.querySelector(".book-form");
const booksGrid = document.querySelector(".books-grid");

const bookList = [];
const fontsToChoose = ["alex-brush", "indie-flower", "journal", "note-this"];

function Book(title, author, pages, hasBeenRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${hasBeenRead ? "has already been read" : "not read yet"}`;
}

Book.prototype.changeReadStatus = function () {
    this.hasBeenRead = this.hasBeenRead ? false : true;
}

function addBookToList(title, author, pages, hasBeenRead) {
    const newBook = new Book(title, author, Number(pages), hasBeenRead === "true" ? true : false);
    bookList.push(newBook);
}

//CLARIFICATION:
//This populates the list of books with books data already created in the booksData.js file.
initialBooks.forEach(book => {
    addBookToList(book.title, book.author, book.pages, book.hasBeenRead);
});

function updateReadStatus(book, event) {
    event.target.parentNode.parentNode.classList.remove(book.hasBeenRead ? "read" : "unread");
    book.changeReadStatus();
    event.target.textContent = book.hasBeenRead ? "Read ✓" : "Not Read ✗";
    event.target.parentNode.parentNode.classList.add(book.hasBeenRead ? "read" : "unread");
}

function updateBookGrid() {
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
    bookList.forEach(book => {
        const newCard = createCatalogCard(book);
        cardsContainer.appendChild(newCard);
    });
}

function deleteBookFromLibrary(event) {
    const indexToDelete = bookList.findIndex(item => item.id === event.target.parentNode.id);
    if (indexToDelete !== -1) {
        bookList.splice(indexToDelete, 1);
        updateBookGrid();
    }
}

function createCatalogCard(book) {
    const cardItem = document.createElement("div");
    const titleData = document.createElement("h3");
    const authorData = document.createElement("p");
    const pagesData = document.createElement("p");
    const readBox = document.createElement("div");
    const readText = document.createElement("p");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    cardItem.id = book.id;
    cardItem.classList.add("card-item");
    cardItem.classList.add(book.hasBeenRead ? "read" : "unread");
    cardItem.classList.add(fontsToChoose[Math.floor(Math.random() * fontsToChoose.length)]);
    titleData.textContent = book.title;
    authorData.textContent = `Author: ${book.author}`;
    pagesData.textContent = `Pages: ${book.pages}`;
    readText.textContent = "Has it been read?";
    readButton.classList.add("read-button");
    readButton.dataset.choice = "toggleRead";
    readButton.textContent = book.hasBeenRead ? "Read ✓" : "Not Read ✗";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.choice = "delete";
    deleteButton.textContent = "X";

    readButton.addEventListener("click", (event) => updateReadStatus(book, event));
    deleteButton.addEventListener("click", deleteBookFromLibrary);

    cardItem.appendChild(titleData);
    cardItem.appendChild(authorData);
    cardItem.appendChild(pagesData);
    readBox.appendChild(readText);
    readBox.appendChild(readButton);
    cardItem.appendChild(readBox);
    cardItem.appendChild(deleteButton);

    return cardItem;
}

function addBookToLibrary(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    addBookToList(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("hasBeenRead"));
    bookForm.reset();
    updateBookGrid();
    bookForm.style.display = "none";
    booksGrid.style.display = "block";
}

function displayBookForm() {
    bookForm.style.display = "block";
    booksGrid.style.display = "none";
}

newBookButton.addEventListener("click", displayBookForm);
bookForm.addEventListener("submit", addBookToLibrary);
document.addEventListener("DOMContentLoaded", updateBookGrid);