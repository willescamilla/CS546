//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const stringChk = (string) => {
  if (!string || string === null || typeof string !== "string") {
    throw new Error();
  }

  if (string.includes(" ")) {
    throw new Error();
  }

  if (parseInt(string) <= 0) {
    throw new Error();
  }
};

module.exports = {
  stringChk,
};
