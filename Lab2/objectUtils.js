/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */

const assertGoodObj = (obj) => {
  if (typeof obj !== "object" || obj === null || obj instanceof Array) {
    throw "Object input is not a valid object";
  }
};

const recurIsEqual = (item1, item2) => {
  if (item1 === item2) {
    return true;
  } else if (typeof item1 != typeof item2) {
    return false;
  } else if (typeof item1 == "number" && isNaN(item1) && isNaN(item2)) {
    return true;
  } else if (
    item1 instanceof String ||
    item1 instanceof Boolean ||
    item1 instanceof Number
  ) {
    return item1.valueOf() == item2.valueOf();
  } else if (
    item1 instanceof RegExp ||
    item1 instanceof Date ||
    item1 instanceof Error
  ) {
    return item1.toString() == item2.toString();
  } else if (
    item1 instanceof Object ||
    item1 instanceof Array ||
    item1 instanceof Function
  ) {
    if (item1 instanceof Function && item1.toString() != item2.toString()) {
      return false;
    }

    const item1Keys = Object.keys(item1);
    if (item1Keys.length != Object.keys(item2).length) {
      return false;
    }
    if (
      !item1Keys.every((key) => {
        return item2.hasOwnProperty(key);
      })
    ) {
      return false;
    }

    return item1Keys.every((key) => {
      return recurIsEqual(item1[key], item2[key]);
    });
  }
  return false;
};

let deepEquality = (obj1, obj2) => {
  assertGoodObj(obj1);
  assertGoodObj(obj2);
  return recurIsEqual(obj1, obj2);
};

const isCommonKeyValue = (item1, item2, result) => {
  if (item1 === item2) {
    return true;
  } else if (typeof item1 != typeof item2) {
    return false;
  } else if (typeof item1 == "number" && isNaN(item1) && isNaN(item2)) {
    return true;
  } else if (
    item1 instanceof String ||
    item1 instanceof Boolean ||
    item1 instanceof Number
  ) {
    return item1.valueOf() == item2.valueOf();
  } else if (
    item1 instanceof RegExp ||
    item1 instanceof Date ||
    item1 instanceof Error
  ) {
    return item1.toString() == item2.toString();
  } else if (
    item1 instanceof Object ||
    item1 instanceof Array ||
    item1 instanceof Function
  ) {
    if (item1 instanceof Function && item1.toString() != item2.toString()) {
      return false;
    }

    item1Keys = Object.keys(item1);
    item1Keys.forEach((key) => {
      if (
        item2.hasOwnProperty(key) &&
        isCommonKeyValue(item1[key], item2[key], result)
      ) {
        result[key] = item1[key];
      }
    });
  }
  return result;
};

let commonKeysValues = (obj1, obj2) => {
  assertGoodObj(obj1);
  assertGoodObj(obj2);
  result = {};
  return isCommonKeyValue(obj1, obj2, result);
};

let calculateObject = (object, func) => {
  assertGoodObj(object);
  if (typeof func !== "function") {
    throw "Function input is not a function";
  }

  const nonNumberItem = Object.values(object).find((item) => {
    return typeof item !== "number";
  });

  if (nonNumberItem) {
    throw "At least 1 value of this object is not a number";
  }

  for (const key in object) {
    object[key] = func(object[key]);
    object[key] = Math.sqrt(object[key]);

    // Using .toFixed() would have the numbers turn into strings
    // Lab2 example output for this function looks like numbers still. So need to use Math.round()
    object[key] = Math.round(object[key] * 1e2) / 1e2;
  }

  return object;
};

module.exports = {
  deepEquality,
  commonKeysValues,
  calculateObject,
};
