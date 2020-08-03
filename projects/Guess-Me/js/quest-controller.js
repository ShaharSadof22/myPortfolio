'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section////
    $('.game-start').hide();
    // TODO: show the quest section////
    $(".quest").css("display", "block");
    renderQuest();
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update////
    // its text by the currQuest text////
    var currQuest = getCurrQuest();
    $('.quest-header').text(currQuest.txt);
}

function onUserResponse(res) {
    // debugger
    console.log('currQuest', getCurrQuest());
    // If this node has no children
    if (isChildless(getCurrQuest())) {

        if (res === 'yes') { 
            // debugger
            console.log('Yes, I knew it!');
            $('.quest-header').text('Yes, I knew it!');

            $('.btn-info').hide();
            $('.btn-danger').hide();

            // createQuestsTree();

            setTimeout(() => {
                $('.quest').css("display", "none");

                $('.btn-info').show();
                $('.btn-danger').show();

                onRestartGame();
            }, 3000)
            // TODO: improve UX
        } else {
            console.log('I dont know...teach me!');
            // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').css("display", "block");
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values////
    // TODO: Call the service addGuess

    var newGuessTxt = $('#newGuess').val();
    var newQuestTxt = $('#newQuest').val();
    console.log('gQuestsTree',gQuestsTree);
    console.log('gCurrQuest',gCurrQuest);
    addGuess(newQuestTxt, newGuessTxt, gLastRes)

    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gCurrQuest = gQuestsTree;
    
}

