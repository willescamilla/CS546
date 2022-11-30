const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require ('bcrypt');

module.exports = {
  firstName: "Anton", 
  lastName: "Danylenko", 
  studentId: "10448226",

  async createUser(username, password){
    if (!username || !password){
      throw new Error('All fields need to have valid values');
    }
    if (typeof username !== 'string' || typeof password !== 'string'){
      throw new Error('Both username and password have to be strings');
    }
    if (username.includes(" ")){
      throw new Error('Username cannot have spaces in it');
    }
    var new_username = username.replace(/[^a-z0-9]/gi,'');
    if (new_username!==username){
      throw new Error('Username must contain only alpanumeric characters');
    }
    if (username.length<4){
      throw new Error('Username must be at least 4 characters long');
    }
    username = username.toLowerCase();
    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (user !== null){
      throw new Error('Username already exists');
    }
    if (password.includes(" ")){
      throw new Error('Password cannot have spaces in it');
    }
    if (password.length<6){
      throw new Error('Password must be at least 6 characters long');
    }
    const hashed_pass = bcrypt.hashSync(password, 5);
    let new_user = {
      _id: new ObjectId(),
      username: username,
      password: hashed_pass
    }
    const insertInfo = await userCollection.insertOne(new_user);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error('Could not add user');
    }
    return {userInserted: true};
  },

  async checkUser(username, password){
    if (!username || !password){
      throw new Error('All fields need to have valid values');
    }
    if (typeof username !== 'string' || typeof password !== 'string'){
      throw new Error('Both username and password have to be strings');
    }
    if (username.includes(" ")){
      throw new Error('Username cannot have spaces in it');
    }
    var new_username = username.replace(/[^a-z0-9]/gi,'');
    if (new_username!==username){
      throw new Error('Username must contain only alpanumeric characters');
    }
    if (username.length<4){
      throw new Error('Username must be at least 4 characters long');
    }
    username = username.toLowerCase();
    if (password.includes(" ")){
      throw new Error('Password cannot have spaces in it');
    }
    if (password.length<6){
      throw new Error('Password must be at least 6 characters long');
    }

    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (user === null){
      throw new Error('Either the username or password is invalid');
    }
    if (!bcrypt.compareSync(password, user["password"])){
      throw new Error('Either the username or password is invalid');
    }
    return {authenticated: true};
  }
}