'use strict';

var gBooks = [];
var gNextId = 1;
var defaultStr = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
var bookImg = './img/book-vector-icon.jpg';
var currReadBook;

function initService() {
    var isLocalEmpty = localStorage.getItem('books')
    if (!isLocalEmpty) {
        _createBooks();
        saveBooks();
    } else {
        getBooks();
    }
    gNextId = findMaxId();
}

function _createBooks() {
    gBooks[0] = _createBook('Learning', 18.2);
    gBooks[1] = _createBook('Beginner', 110.1);
    gBooks[2] = _createBook('Pro', 15);
}

function _createBook(name, price, imgSrc = bookImg, bookDetails = defaultStr) {
    return {
        id: gNextId++,
        name,
        price,
        imgSrc,
        rate: 0,
        bookDetails
    }
}

function removeBook(bookId) {
    gBooks = gBooks.filter(function(book) {
        return book.id !== bookId;
    })
    renderBooks();
    saveBooks();
}

function addBook(name, price) {
    gBooks[gBooks.length] = _createBook(name, price);
    saveBooks();
    renderBooks();
}

function updateBook(bookId, bookPrice){
    var bookInd = getBookIndById(bookId);
    gBooks[bookInd].price = bookPrice;
    renderBooks();
}

function getBookIndById(bookId) {
    for (var i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id === bookId) return i;
    }
}

function readBook(bookId) {
    var bookInd = getBookIndById(bookId);
    return {
        bookName: gBooks[bookInd].name,
        bookDetails: gBooks[bookInd].bookDetails,
        imgSrc: gBooks[bookInd].imgSrc,
        rate: gBooks[bookInd].rate
    }
}

function updateCurrBook(bookId) {
    var currReadInd = getBookIndById(bookId);
    currReadBook = gBooks[currReadInd];
}

function reduceRate() {
    return --currReadBook.rate;
}

function addRate() {
    return ++currReadBook.rate;
}

function isRateInRange(change) {
    return (((currReadBook.rate + change) >= 0) && ((currReadBook.rate + change) <= 10));
}

function findMaxId() {
    var maxIdValue = -Infinity;
    for (var i = 0; i < gBooks.length; i++) {
        if (maxIdValue < gBooks[i].id) maxIdValue = gBooks[i].id;
    }
    return maxIdValue + 1;
}