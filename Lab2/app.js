/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */
const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objectUtils = require("./objectUtils");

//array utils testing
try {
  // Should pass
  const arrayStats = arrayUtils.arrayStats([
    9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20,
  ]);
  //console.log(arrayStats);
  console.log("arrayStats passed successfully");
} catch (e) {
  console.log("arrayStats failed test case");
  //console.log(e);
}
try {
  // Should fail
  const arrayStats = arrayUtils.arrayStats(["guitar", 1, 3, "apple"]);
  console.log("arrayStats passed successfully");
} catch (e) {
  console.log("arrayStats failed test case");
  //console.log(e);
}
try {
  // Should pass
  const makeObjects = arrayUtils.makeObjects(
    ["foo", "bar"],
    ["name", "Patrick Hill"],
    ["foo", "not bar"]
  );
  //console.log(makeObjects);
  console.log("makeObjects passed successfully");
} catch (e) {
  console.log("makeObjects failed test case");
  console.log(e);
}
try {
  // Should fail
  const makeObjects = arrayUtils.makeObjects(["guitar", 1, 3, "apple"]);
  console.log("makeObjects passed successfully");
} catch (e) {
  console.log("makeObjects failed test case");
  //console.log(e);
}
try {
  // Should pass
  const arr5 = [67.7, "Patrick", true];
  const arr6 = [true, 5, "Patrick"];
  const commonElements = arrayUtils.commonElements(arr5, arr6);
  //console.log(commonElements);
  console.log("commonElements passed successfully");
} catch (e) {
  console.log("commonElements failed test case");
  console.log(e);
}
try {
  // Should fail
  const commonElements = arrayUtils.commonElements([1, 2, "nope"]);
  console.log("commonElements passed successfully");
} catch (e) {
  console.log("commonElements failed test case");
  //console.log(e);
}

//string utils testing
try {
  // Should pass
  const palindromes = stringUtils.palindromes(
    "Hi mom, At noon, I'm going to take my kayak to the lake'"
  );
  //console.log(palindromes);
  console.log("palindromes passed successfully");
} catch (e) {
  console.log("palindromes failed test case");
}
try {
  // Should fail
  const palindromes = stringUtils.palindromes("    ");
  console.log("palindromes passed successfully");
} catch (e) {
  console.log("palindromes failed test case");
  //console.log(e);
}
try {
  // Should pass
  const replaceChar = stringUtils.replaceChar(
    "Hello, How are you? I hope you are well"
  );
  //console.log(replaceChar);
  console.log("replaceChar passed successfully");
} catch (e) {
  console.log("replaceChar failed test case");
  console.log(e);
}
try {
  // Should fail
  const replaceChar = stringUtils.replaceChar("    ");
  console.log("replaceChar passed successfully");
} catch (e) {
  console.log("replaceChar failed test case");
  //console.log(e);
}
try {
  // Should pass
  const charSwap = stringUtils.charSwap("Patrick", "Hill");
  //console.log(charSwap);
  console.log("charSwap passed successfully");
} catch (e) {
  console.log("charSwap failed test case");
  console.log(e);
}
try {
  // Should fail
  const charSwap = stringUtils.charSwap("h", "Hello");
  console.log("charSwap passed successfully");
} catch (e) {
  console.log("charSwap failed test case");
  //console.log(e);
}

//object utils testing
try {
  // Should pass
  const first = { a: 2, b: 3 };
  const second = { a: 2, b: 4 };
  const third = { a: 2, b: 3 };
  const forth = {
    a: { sA: "Hello", sB: "There", sC: "Class" },
    b: 7,
    c: true,
    d: "Test",
  };
  const fifth = {
    c: true,
    b: 7,
    d: "Test",
    a: { sB: "There", sC: "Class", sA: "Hello" },
  };
  const deepEquality = objectUtils.deepEquality(first, third);
  //console.log(deepEquality);
  console.log("deepEquality passed successfully");
} catch (e) {
  console.log("deepEquality failed test case");
  console.log(e);
}
try {
  // Should fail
  const deepEquality = objectUtils.deepEquality("foo", "bar");
  console.log("deepEquality passed successfully");
} catch (e) {
  console.log("deepEquality failed test case");
  //console.log(e);
}
try {
  // Should pass
  const first = { name: { first: "Patrick", last: "Hill" }, age: 46 };
  const second = {
    school: "Stevens",
    name: { first: "Patrick", last: "Hill" },
  };
  const third = { a: 2, b: { c: true, d: false } };
  const forth = { b: { c: true, d: false }, foo: "bar" };
  const commonKeysValues = objectUtils.commonKeysValues(first, second);
  //console.log(commonKeysValues);
  console.log("commonKeysValues passed successfully");
} catch (e) {
  console.log("commonKeysValues failed test case");
  console.log(e);
}
try {
  // Should fail
  const commonKeysValues = objectUtils.commonKeysValues("foo", "bar");
  console.log("commonKeysValues passed successfully");
} catch (e) {
  console.log("commonKeysValues failed test case");
  //console.log(e);
}
try {
  // Should pass
  const calculateObject = objectUtils.calculateObject(
    { a: 3, b: 7, c: 5 },
    (n) => n * 2
  );
  //console.log(calculateObject);
  console.log("calculateObject passed successfully");
} catch (e) {
  console.log("calculateObject failed test case");
  console.log(e);
}
try {
  // Should fail
  const calculateObject = objectUtils.calculateObject("foo", "bar");
  console.log("calculateObject passed successfully");
} catch (e) {
  console.log("calculateObject failed test case");
  //console.log(e);
}
