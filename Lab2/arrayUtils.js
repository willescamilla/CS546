/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */
const assertIsArray = (array) => {
  if (!array || typeof array !== "object" || !(array instanceof Array)) {
    throw "Input is not an array";
  }
};

let arrayStats = (array) => {
  assertIsArray(array);

  const isNotNumArray = array.find((currentElm) => {
    return typeof currentElm !== "number";
  });

  if (isNotNumArray) {
    throw "Array has a non number element";
  }

  array.sort(function (a, b) {
    return a - b;
  });

  let median;
  const modeObject = {};
  let mode = 0;
  const count = array.length;
  const minimum = array[0];
  const maximum = array[count - 1];
  const range = maximum - minimum;
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    sum += current;

    if (modeObject[current]) {
      modeObject[current]++;
    } else {
      modeObject[current] = 1;
    }

    if (!modeObject[mode] || modeObject[mode] < modeObject[current]) {
      mode = current;
    }
  }

  const mean = sum / count;

  if (array.length % 2 === 0) {
    median = array[count / 2 - 1] + array[count / 2] / 2;
  } else {
    median = array[(count - 1) / 2];
  }

  return {
    mean: mean,
    median: median,
    mode: mode,
    range: range,
    minimum: minimum,
    maximum: maximum,
    count: count,
    sum: sum,
  };
};

let makeObjects = (...arrays) => {
  assertIsArray(arrays);
  arrays.forEach((array) => assertIsArray(array));

  const goodArrays = arrays.filter((array) => {
    return array.length === 2;
  });

  if (goodArrays.length !== arrays.length) {
    throw "At least 1 array was not of length 2";
  }

  result = {};

  arrays.forEach((array) => {
    result[array[0]] = array[1];
  });

  return result;
};

let commonElements = (...arrays) => {
  assertIsArray(arrays);
  if (arrays.length < 2) {
    throw "There must be at least 2 arrays in this array";
  }

  arrays.forEach((array) => assertIsArray(array));
  const emptyArrays = arrays.filter((array) => {
    return array.length === 0;
  });

  if (emptyArrays.length > 0) {
    throw "At least 1 array was empty";
  }

  occurences = {};
  arrays.forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      if (occurences[array[i]]) {
        occurences[array[i]]++;
      } else {
        occurences[array[i]] = 1;
      }
    }
  });

  commonElements = [];
  for (const key in occurences) {
    if (occurences[key] === arrays.length) {
      commonElements.push(key);
    }
  }

  return commonElements;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements,
};
