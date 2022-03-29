const form = document.getElementById("book-form")
const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const isbnInput = document.getElementById("isbn")
const list = document.getElementById("book-list")
const container = document.querySelector(".container")

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    addToBookList(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X<a></td>
        `;
      
        list.appendChild(row);
    }

    clearField() {
        titleInput.value = ""
        authorInput.value = ""
        isbnInput.value = ""
    }

    showAlert(msg, className) {
        const div = document.createElement("div")
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg))

        container.insertBefore(div, form)

        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === "delete") {
            target.parentElement.parentElement.remove()
        } else {

        }
    }
    
}

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
  
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach(function(book){
        const ui  = new UI;
  
        ui.addToBookList(book);
      });
    }
  
    static addBook(book) {
      const books = Store.getBooks();
  
      books.push(book);
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach(function(book, index){
       if(book.isbn === isbn) {
        books.splice(index, 1);
       }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  document.addEventListener('DOMContentLoaded', Store.displayBooks);


form.addEventListener("submit", (e) => {

    const title = titleInput.value
    const author = authorInput.value
    const isbn = isbnInput.value

    const book = new Book(title, author, isbn)

    const ui = new UI()
    
    if(title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill all in field", "error")
    } else {
        ui.addToBookList(book)
        Store.addBook(book)
        ui.showAlert("Book Added", "success")
        ui.clearField()
    }

    e.preventDefault()
})

list.addEventListener("click", (e) => {
    const ui = new UI()

    ui.deleteBook(e.target)

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert("Book Removed!", "success")

    e.preventDefault()
})