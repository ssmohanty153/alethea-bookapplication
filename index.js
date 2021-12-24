const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");
var path = require('path');
const app = express();
const port = 4000;
let books = [];
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(express.static('./'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/book.html'));
  });
 

app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/books', (req, res) => {
    res.json(books);
})
app.post('/book', (req, res) => {
    const book = req.body;
    //console.log(book);
    books.push(book);
    res.sendFile(path.join(__dirname + '/booklist.html'));
});
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books.splice(i,1);

        }
    }
    console.log(books);
    res.sendFile(path.join(__dirname + '/booklist.html'));
});

app.get('/get_books',(req,res)=>{
    res.sendFile(path.join(__dirname + '/booklist.html'));
});

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});

app.listen(port,'0.0.0.0', () => console.log(`Book app listening on port ${port}!`))