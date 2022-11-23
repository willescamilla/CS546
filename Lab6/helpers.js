//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const stringChk = (string) => {
  if (!string || string === null || typeof string !== "string") {
    throw new Error();
  }
};

const noSpacesChk = (string) => {
  if (string.includes(" ")) {
    throw new Error();
  }
};

const validateString = (string) => {
  if (!string || string === null || typeof string !== "string") {
    return false;
  }

  return true;
};

const validateNoSpaces = (string) => {
  if (string.includes(" ")) {
    return false;
  }

  return true;
};

const validateOnlyNumbers = (string) => {
  // Check if string equals itself after removing everything except digits
  if (string.replace(/\D/g, "").localCompare(string) !== 0) {
    return false;
  }

  return true;
};

module.exports = {
  stringChk,
  noSpacesChk,
  validateString,
  validateNoSpaces,
  validateOnlyNumbers,
};
