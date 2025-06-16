const myLibrary = [];

function Book(title, author, pages, hasRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function(){
    this.hasRead = !this.hasRead;
}

function addBookToLibrary(title, author, pages, hasRead = false) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('libraryDisplay');
    libraryDiv.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.setAttribute("data-id", book.id);

        card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.hasRead ? "Read" : "Not read yet"}</p>
        <p><small><em>ID:</em></small> ${book.id}</p>
        <button class="btn toggle-read">Toggle Read</button>
        <button class="btn remove-book">Remove</button>
        `;

        const toggleBtn = card.querySelector('.toggle-read');
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const removeBtn = card.querySelector(".remove-book");
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        });

        libraryDiv.appendChild(card);
    });
}

    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
    addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281);
    
let newBook = document.querySelector('.addBtn').addEventListener('click', newBookBtn);

function newBookBtn() {
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    addBookToLibrary(name, author, pages);
}