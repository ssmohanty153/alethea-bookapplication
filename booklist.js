const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title,
        author,
        publisher,
        publishDate,
        numOfPages
    } = book;
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publishDate').value = publishDate;
    document.getElementById('numberOfPage').value = numOfPages;
    document.getElementById('editForm').action = `/book/${isbn}`;
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `/book/${isbn}`, false);
    xhttp.send();

    setTimeout(function(){
       // location.reload();
       location.href='/get_books';
    },2000)
   
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteBook('${book.isbn}')">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                        
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();