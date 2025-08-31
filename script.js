//TEST AREA
const testDiv = document.querySelector(".test-div");

for (let index = 0; index <= 10; index++) {
    const testNumber = document.createElement("p");
    testNumber.textContent = `${index}...`;
    testDiv.appendChild(testNumber);
}
const testText = document.createElement("p");
testText.textContent = "The JS is working as well...";
testDiv.appendChild(testText);
//------------------------------------------------------------
const cardsContainer = document.querySelector(".cards-container");
const bookList = [];

function addNewLine(newText, typeElement) {
    let tagToUse = !typeElement ? "p" : typeElement;
    const newLine = document.createElement(tagToUse);
    newLine.textContent = newText;
    testDiv.appendChild(newLine);
}

function Book(title, author, pages, hasBeenRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${hasBeenRead ? "has already been read" : "not read yet"}`;
    }
}

Book.prototype.changeReadStatus = function () {
    this.hasBeenRead = this.hasBeenRead ? false : true;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
    const newBook = new Book(title, author, pages, hasBeenRead);
    bookList.push(newBook);
}

function deleteBookFromLibrary(bookId) {
    const indexToDelete = bookList.findIndex(item => item.id === bookId);
    if (indexToDelete !== -1) {
        bookList.splice(indexToDelete, 1);   
    }
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Moby Dick", "Herman Melville", 635, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, true);
addBookToLibrary("Brave New World", "Aldous Huxley", 268, false);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);

addNewLine("List of books on library:", "h2")
bookList.forEach(book => {
    addNewLine(`ID: ${book.id} / Info: ${book.info()}`);
});

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
    titleData.textContent = book.title;
    authorData.textContent = `Author: ${book.author}`;
    pagesData.textContent = `Pages: ${book.pages}`;
    readText.textContent = "Has it been read?";
    readButton.classList.add("read-button");
    readButton.dataset.choice = "toggleRead";
    readButton.textContent = book.hasBeenRead ? "Read ✓" : "Not Read ✗";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.choice = "delete";
    deleteButton.textContent = "Delete";

    cardItem.appendChild(titleData);
    cardItem.appendChild(authorData);
    cardItem.appendChild(pagesData);
    readBox.appendChild(readText);
    readBox.appendChild(readButton);
    cardItem.appendChild(readBox);
    cardItem.appendChild(deleteButton);

    return cardItem;
}

bookList.forEach(book => {
    const newCard = createCatalogCard(book);
    cardsContainer.appendChild(newCard);
    console.log(newCard);
});