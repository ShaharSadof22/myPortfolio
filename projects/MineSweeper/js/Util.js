
// find neighbors in a global matrix 
function countNeighbors(iIndex, jIndex) {
  var counter = 0;
  var rowIdxStart = iIndex - 1;
  var rowIdxEnd = iIndex + 1;
  var colIdxStart = jIndex - 1;
  var colIdxEnd = jIndex + 1;

  // verify the area
  if (iIndex === 0) {
    rowIdxStart = 0;
  }
  if (iIndex === gBoardSize - 1) {
    rowIdxEnd = gBoardSize - 1;
  }
  if (jIndex === 0) {
    colIdxStart = 0;
  }
  if (jIndex === gBoardSize - 1) {
    colIdxEnd = gBoardSize - 1;
  }

  // count neighbors
  for (var rowIndex = rowIdxStart; rowIndex < rowIdxEnd + 1; rowIndex++) {
    for (var callIndex = colIdxStart; callIndex < colIdxEnd + 1; callIndex++) {
      if (gBoard[rowIndex][callIndex] === "x") {
        counter++;
      }
    }
  }
  if (gBoard[iIndex][jIndex] === 'x') {
    counter--;
  }
  return counter;
}

// create random array in 'size' length
function createRandNums(size) {
  var nums = [];
var tempNums = [];
for (var i = 0; i < size; i++) {
  tempNums.push(i + 1);
}
while (tempNums.length > 0) {
  var randNum = tempNums[Math.floor(Math.random() * (tempNums.length - 1))];
  var currNum = tempNums[randNum];

  if (currNum !== undefined) {
    nums.push(currNum);
    tempNums.splice(randNum, 1);
  } else if (tempNums.length === 1) {  /// for the last number in tempNums
      nums.push(tempNums[0]);
    tempNums.splice(0, 1);
  }
}
return nums;
}

// Create matrix rows*calls with number
function createMatrix(rows, calls, fromNum = 0, toNum = 10) {
  var mat = [];
  for (var i = 0; i < rows; i++) {
    mat[i] = [];
    for (var j = 0; j < calls; j++) {
      mat[i][j] = Math.floor(Math.random() * (toNum + 1 - fromNum) + fromNum);
    }
  }
  console.table('The matrix is:', mat);
  return mat;
}

// Sort an arrt two times?
function bubbleSort(inputArr) {
  var len = inputArr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (inputArr[j] > inputArr[j + 1]) {
        var tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
      }
    }
  }
  return inputArr;
}

// Find the 3 (nthNum) biggest num in arry of nums
function getNthLargest(nums, nthNum) {
  var sortNums = sortArr(nums);
  function sortArr(nums) {
    nums = nums.sort((a, b) => a - b);
    return nums;
  }
  return sortNums[sortNums.length - nthNum];
}

// Return the first index of a str(searchStr) in str(str)
function findIndexOf(str, searchStr) {
  for (var i = 0; i < str.length; i++) {
    var counter = 1;

    if (str.charAt(i) == searchStr.charAt(0)) {
      for (var j = 1; j < searchStr.length; j++) {
        if (str.charAt(i + j) == searchStr.charAt(j)) {
          counter++;
        }
      }
      if (counter === searchStr.length) {
        return i;
      }
    }
  }
  return -1;
}

// Duplicate an arry by multiplier, if isImmutable true - slice() to new arry
function multBy(nums, multiplier, isImmutable = true) {
  var newNums = isImmutable ? nums.slice() : nums;
  for (var i = 0; i < newNums.length; i++) {
    newNums[i] *= multiplier;
  }
  return newNums;
}

// Return new arry of all the names in the arry names that start with letter
function startsWithLetter(names, letter) {
  var newArr = [];
  for (var i = 0; i < names.length; i++) {
    if (names[i][0] === letter) newArr.push(names[i]);
  }
  return newArr;
}

// Generate a new word with length of 3-6 letters
function getWord() {
  var newWord = "";
  var alphabetArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  var rendomLength = Math.floor(Math.random() * (6 - 3) + 3);
  for (var i = 0; i < rendomLength; i++) {
    var rendomIdx = Math.floor(Math.random() * (25 - 0));
    newWord += alphabetArr[rendomIdx];
  }
  return newWord;
}

// Generate a password using ascii code
function generatePass(passLength) {
  var asciiNum = 0;
  var newPass = "";
  for (var i = 0; i < passLength; i++) {
    asciiNum = Math.random() * (127 - 32) + 32;
    newPass += String.fromCharCode(asciiNum);
  }
  return newPass;
}

// Return the shortes and longest name from an arry
function FindShortAndLongName(names) {
  var longName = "";
  var shortName = "";
  var count = 0;

  for (var i = 0; i < names.length; i++) {
    var tempName = "";
    if (names.charAt(i) === ",") {
      tempName = names.substring(count, i);
      count = i + 1;
    }
    if (i === names.length - 1) {
      tempName = names.substring(count, i + 1);
    }
    if (longName.length < tempName.length) {
      longName = tempName;
    }
    if (
      (shortName.length > tempName.length && tempName !== "") ||
      shortName === ""
    ) {
      shortName = tempName;
    }
  }
  console.log(longName, "and", shortName);
}

// Get a password and encrypt it by adding 5 for it's ascii code
function encrypt(passwordStr) {
    var tempAscii = "";
    var encryptPasswordStr = "";
    for (var i = 0; i < passwordStr.length; i++) {
      tempAscii = passwordStr.charCodeAt(i) + 5;
      encryptPasswordStr += String.fromCharCode(tempAscii);
    }
    return encryptPasswordStr;
  }
//   Return the encrypt password to it's source
  function decrypt(encryptName) {
    var tempAscii = "";
    var decryptPasswordStr = "";
    for (var i = 0; i < encryptName.length; i++) {
      tempAscii = encryptName.charCodeAt(i) - 5;
      decryptPasswordStr += String.fromCharCode(tempAscii);
    }
    return decryptPasswordStr;
  }