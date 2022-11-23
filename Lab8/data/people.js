const axios = require("axios");

const getAllPeople = async () => {
  let allPeople = [];
  allPeople = await axios.get(
    "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json"
  );
  return allPeople;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
  searchPersonName.trim();

  const allPeople = await getAllPeople();
  let somePeople = [];
  for (const person in allPeople.data) {
    if (
      allPeople.data[person].firstName
        .toLowerCase()
        .includes(searchPersonName.toLowerCase()) ||
      allPeople.data[person].lastName
        .toLowerCase()
        .includes(searchPersonName.toLowerCase())
    ) {
      somePeople.push(allPeople.data[person]);
    }
  }
  if (somePeople.length > 20) {
    somePeople = somePeople.slice(0, 20);
  }

  somePeople.sort(function (a, b) {
    return a.id - b.id;
  });

  return somePeople;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
  id.trim();
  const allPeople = await getAllPeople();
  let personFound;
  for (const person in allPeople.data) {
    if (allPeople.data[person].id == id) {
      personFound = allPeople.data[person];
      break;
    }
  }
  return personFound;
};

module.exports = { searchPeopleByName, searchPeopleByID };
