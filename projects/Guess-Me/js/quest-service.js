var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {

    var storage = localStorage.getItem('questTree');
    if (storage) {
        gQuestsTree = JSON.parse(storage) ;
    } else {
        gQuestsTree = createQuest('Male?');
        console.log('gQuestsTree', gQuestsTree);
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }

    gCurrQuest = gQuestsTree;

    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars////
    // console.log('res', res);
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
    // gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no ;
    // console.log('res',res);
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree

    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;

    gPrevQuest[lastRes] = newQuest;

    gCurrQuest = gQuestsTree;
    _saveTree();
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveTree() {
    localStorage.setItem('questTree', JSON.stringify(gQuestsTree));
}
