'use strict';

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(gBooks));
    // if (!gBooks.length) storage.clear();
}

function getBooks() {
    var strBooks = localStorage.getItem('books');
    gBooks = JSON.parse(strBooks);
}