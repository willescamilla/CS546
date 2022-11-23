function questionOne(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(isPrime(arr[i]));
  }

  return result;
}

function isPrime(n) {
  if (n <= 1) {
    return false;
  }

  for (let k = 2; k < n; k++) {
    if (n % k === 0) {
      return false;
    }
  }

  return true;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  if (startingNumber === 0 || commonRatio === 0) {
    return 0;
  }
  if (numberOfTerms <= 0 || !Number.isInteger(numberOfTerms)) {
    return NaN;
  }

  return Array.from(Array(numberOfTerms))
    .map((number, index) =>
      index === 0
        ? startingNumber
        : startingNumber * Math.pow(commonRatio, index)
    )
    .reduce((currSum, current) => currSum + current, 0);
}

function questionThree(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  const simpleStr = str.replace(/[^a-z]/gi, "");
  count = 0;

  for (let i = 0; i < simpleStr.length; i++) {
    if (vowels.indexOf(simpleStr.charAt(i)) == -1) {
      count++;
    }
  }

  return count;
}

function questionFour(fullString, substring) {
  count = 0;
  for (let i = 0; i < fullString.length; i++) {
    if (fullString.indexOf(substring, i) != -1) {
      count++;
      i = fullString.indexOf(substring, i) + 1;
    }
  }

  return count;
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: "William",
  lastName: "Escamilla",
  studentId: "10434656",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
