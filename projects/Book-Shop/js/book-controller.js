'use strict';

function init() {
    initService();
    renderBooks();
}

function renderBooks() {
    var strHTML = '<table>\n\t<thead>\n\t<tr>';
    strHTML += `
    <th class="id-call">id</th>
    <th class="title-call">Title</th>
    <th class="price-call">Price</th>
    <th class="action-call" colspan="3">Actions</th>
    </thead>
    <tbody>`; //header

    for (var i = 0; i < gBooks.length; i++) {
        strHTML += `
        <tr>
        <td>${gBooks[i].id}</td>
        <td>${gBooks[i].name}</td>
        <td>${gBooks[i].price}</td>
        <td><button class="read-button action-btn" onclick="onReadBook(${gBooks[i].id})">Read</button></td>
        <td><button class="update-button action-btn" onclick="onUpdateBook(${gBooks[i].id})">Update</button></td>
        <td><button class="delete-button action-btn" onclick="onRemoveBook(${gBooks[i].id})">Delete</button></td>
        </tr>`;
    }
    strHTML += `</tbody></table>`;

    document.querySelector('.main-table').innerHTML = strHTML;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
}

function onAddBook() {
    // document.querySelector('.insert-data').classList.remove('hide');
    var name = prompt('Book name:');
    var price = +prompt('Book price:');
    if (!name || price <= 0) return;
    addBook(name, price)
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt('New price for the book:');
    updateBook(bookId, bookPrice);
}

function onReadBook(bookId) {
    updateCurrBook(bookId);
    var bookReadDetails = readBook(bookId);
    renderBookDetails(bookReadDetails);
}

function onRemoveRead() {
    document.querySelector('.read-section').classList.add('hide');
}

function renderBookDetails(readDetails) {
    document.querySelector('.read-section').classList.remove('hide');
    document.querySelector('.read-name').innerHTML = `Book name: ${readDetails.bookName}`;
    document.querySelector('.read-details').innerHTML = `Description: ${readDetails.bookDetails}`;
    document.querySelector('.rate-amount').innerHTML = `<p class="rate-amount">${readDetails.rate}</p>`
    document.querySelector('.read-img').src = readDetails.imgSrc;
}

function onReduceRate() {
    if (!isRateInRange(-1)) return;
    var newRate = reduceRate();
    document.querySelector('.rate-amount').innerHTML = newRate;
}

function onAddRate() {
    if (!isRateInRange(1)) return;
    var newRate = addRate();
    document.querySelector('.rate-amount').innerHTML = newRate;
}