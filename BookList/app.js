// book Class : represent a book
class Book {
  constructor (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


// UI class: handle UI task
class ui {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) { 
      ui.addBookToList(book)});
  }

  static addBookToList(book){
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    
    row.innerHTML = 
    `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row)
  }
  static deleteBook(el) {
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Vanish in 3 Seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearfields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}


// Event: display Books
document.addEventListener('DOMContentLoaded', ui.displayBooks);

// Event: add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

  //prevent actual submit
  e.preventDefault();

 //get Form Values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === ''){
    //show failed alert
    ui.showAlert('Please fill in All Fields', 'danger');
  } else{

    // show success alert
    ui.showAlert('Successfully Submitted a Book', 'success')

      // Instantiate Book
      const book = new Book(title, author, isbn);

      // add book to list
      ui.addBookToList(book);

      //add book to store
      Store.addBook(book);

      //clear fields
      ui.clearfields();

  }
  
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  ui.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
 ui.showAlert('Book Removed', 'success');
});