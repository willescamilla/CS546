//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const validation = (username, password) => {
  if (!username || !password) {
    throw new Error("All fields need to have valid values");
  }
  if (typeof username !== "string" || typeof password !== "string") {
    throw new Error("Both username and password have to be strings");
  }
  if (username.includes(" ")) {
    throw new Error("Username cannot have spaces in it");
  }
  var new_username = username.replace(/[^a-z0-9]/gi, "");
  if (new_username !== username) {
    throw new Error("Username must contain only alpanumeric characters");
  }
  if (username.length < 4) {
    throw new Error("Username must be at least 4 characters long");
  }
  if (password.includes(" ")) {
    throw new Error("Password cannot have spaces in it");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
};

module.exports = {
  validation,
};
