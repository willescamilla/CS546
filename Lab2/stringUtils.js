/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */
const assertValidString = (string) => {
  if (typeof string !== "string") {
    throw "String doesn't exist";
  }

  temp = string.trim();
  if (temp.length < 1) {
    throw "String is empty quotes";
  }
};

let palindromes = (string) => {
  string = string.toLowerCase();
  assertValidString(string);
  string = string.replace(/[^a-zA-Z ]/g, "");

  let palindromes = [];
  for (let curr = 0; curr < string.length; ) {
    let space = string.indexOf(" ", curr);

    // this is if its the last word or only word in the string
    if (space === -1) {
      space = string.length;
    }

    let isPalindrome = true;
    let lhs = curr;
    let rhs = space - 1;

    // Check left and right characters of a word for equality
    // Stop once two of them aren't equal, or when rhs <= lhs
    while (isPalindrome && rhs > lhs) {
      if (string[lhs] !== string[rhs]) {
        isPalindrome = false;
      } else {
        lhs++;
        rhs--;
      }
    }

    // if isPalindrome after the while loop
    // then while loop ended because rhs <= lhs
    // So that word is a palindrome
    if (isPalindrome) {
      palindromes.push(string.slice(curr, space));
    }

    // Move curr to the next character after the space
    curr = space + 1;
  }

  // removes single letters
  return palindromes.filter((item) => {
    return item.length > 1;
  });
};

let replaceChar = (string) => {
  assertValidString(string);
  const stringArr = string.split("");
  let star = true;
  for (let i = 1; i < stringArr.length; i += 2) {
    if (star) {
      stringArr[i] = "*";
      star = false;
    } else {
      stringArr[i] = "$";
      star = true;
    }
  }

  return stringArr.join("");
};

let charSwap = (string1, string2) => {
  assertValidString(string1);
  assertValidString(string2);
  if (string1.length < 4 || string2.length < 4) {
    throw "One of these strings is less than 4 characters";
  }

  const string1Arr = string1.split("");
  const string2Arr = string2.split("");

  for (let i = 0; i < 4; i++) {
    let temp = string1Arr[i];
    string1Arr[i] = string2Arr[i];
    string2Arr[i] = temp;
  }

  return string1Arr.join("").concat(" ", string2Arr.join(""));
};

module.exports = {
  palindromes,
  replaceChar,
  charSwap,
};
