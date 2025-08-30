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

function addBookToLibrary(title, author, pages, hasBeenRead) {
    const newBook = new Book(title, author, pages, hasBeenRead);
    bookList.push(newBook);
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