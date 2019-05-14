// UI Vars:
/*
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const btn = document.querySelector('#book-form');
const delBtn = document.querySelector('tbody');
const container = document.querySelector('.container');
const header = document.querySelector('h1')

// Event Listeners:

// Remove from book list
delBtn.addEventListener('click', remBtn);

// Add to book list
btn.addEventListener('submit', addBook);


// Functions:

// Add Book to Book list
function addBook(e){
  console.log(typeof isbn.value);
  // Validation
  if(title.value !== '' || author.value !== '' || isbn.value !== ''){
    const tr = document.createElement('tr');
    const newBook = `<td>${title.value}</td>
                    <td>${author.value}</td>
                    <td>${isbn.value}</td>
                    <td><a href="#" style="text-decoration:none" class="btn-delete">x</a></td>`;
    tr.innerHTML += newBook;
    document.querySelector('tbody').appendChild(tr);
    title.value = '';
    author.value = '';
    isbn.value = '';
  } else {
    errorMsg('Please fill up all fields.');
  }
  
  e.preventDefault();
};

// Remove from book list
function remBtn(e){
  if(e.target.classList.contains('btn-delete')){
    e.target.parentElement.parentElement.remove();
  } else {
    console.log('empty');
  }

};

// Error message
function errorMsg(msg){
  const ban = document.createElement('div');
  ban.classList = 'u-full-width alert error';
  ban.style.width = '100%';
  ban.style.height = '8vh';
  ban.style.textAlign = 'center';
  ban.style.padding = '10px';
  ban.style.backgroundColor = 'red';

  container.insertBefore(ban, btn);
  ban.textContent = msg;

  title.style.borderColor = 'red';
  author.style.borderColor = 'red';
  isbn.style.borderColor = 'red';

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
  console.log(ban);
};
*/

// Book cinstructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</td>
  `;
  list.appendChild(row);
}

// PROTOTYPES:

// Show alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3s
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}



// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get forms values 
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instatiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields!', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success msg
    ui.showAlert('New book added!', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  // Instatiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show Message
  ui.showAlert('Book Removed!', 'success')
  e.preventDefault();
});