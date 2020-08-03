'use strict';

var gProjs = [];
var imgUrl = 'img/portfolio/';
var nextId = 1;

function initService() {
    createProjs();
    console.log('gProjs', gProjs);
}

function createProjs(){
    gProjs[0] = createProj('Guess-Me', 'Guess a person name', '2020-02-1');
    gProjs[1] = createProj('Book-Shop', 'Management platform for book shop', '2020-03-2');
    gProjs[2] = createProj('Chess', 'Let\'s play chess', '2020-04-3');
    gProjs[3] = createProj('MineSweeper', 'Try to find some mines', '2020-05-4');
    gProjs[4] = createProj('Pacman', 'I\'m sure you know this game', '2020-06-5');
}


function createProj(name, desc, date) {
    return {
        name,
        desc,
        url: imgUrl + '0' + nextId + '-thumbnail' + '.jpg',
        id: nextId++,
        publishedAt: date
    }
}
