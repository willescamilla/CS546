const { posts } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const { validation } = require("../helpers");

const createUser = async (username, password) => {
  validation(username, password);

  const lowerCasedUsername = username.toLowerCase();
  const userCollection = await posts();
  const user = await userCollection.findOne({ username: lowerCasedUsername });
  if (user !== null) {
    throw new Error("Username already exists");
  }

  const hashed_pass = bcrypt.hashSync(password, 5);
  let new_user = {
    _id: new ObjectID(),
    username: lowerCasedUsername,
    password: hashed_pass,
  };
  const insertInfo = await userCollection.insertOne(new_user);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error("Could not add user");
  }
  return { insertedUser: true };
};

const checkUser = async (username, password) => {
  validation(username, password);
  const lowerCasedUsername = username.toLowerCase();
  const userCollection = await posts();
  const user = await userCollection.findOne({ username: lowerCasedUsername });
  if (user === null) {
    throw new Error("Either the username or password is invalid");
  }
  if (!bcrypt.compareSync(password, user["password"])) {
    throw new Error("Either the username or password is invalid");
  }
  return { authenticatedUser: true };
};

module.exports = { createUser, checkUser };
