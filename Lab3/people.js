/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */
const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
  );
  return data; // this will be the array of people objects
}

const assertGoodString = (str) => {
  if (
    !str ||
    str == null ||
    typeof str != "string" ||
    str.replace(/\s/g, "").length === 0
  ) {
    throw "String Id not valid";
  }
};

const getPersonById = async (id) => {
  assertGoodString(id);
  let result = null;
  let peopleArr = await getPeople();

  const loop = peopleArr.forEach((person) => {
    if (person.id === id) {
      result = person;
    }
  });

  if (result === null) {
    throw "Person not found";
  }

  return result;
};

const sameJobTitle = async (jobTitle) => {
  assertGoodString(jobTitle);
  let result = [];
  let peopleArr = await getPeople();
  jobTitle = jobTitle.toLowerCase();

  if (jobTitle.length !== jobTitle.replace(/[^a-zA-Z0-9\/ ]/g, "").length) {
    throw "JobTitle not valid";
  }
  jobTitle = jobTitle.replace(/[^a-zA-Z0-9\/ ]/g, "");

  const loop = peopleArr.forEach((person) => {
    if (person.job_title.toLowerCase() == jobTitle) {
      result.push(person);
    }
  });

  if (result.length < 2) {
    throw "At least 2 people must have same job title";
  }

  return result;
};

const getPostalCodes = async (city, state) => {
  assertGoodString(city);
  assertGoodString(state);
  let residents = [];
  let peopleArr = await getPeople();
  city = city.toLowerCase();
  state = state.toLowerCase();

  const loop = peopleArr.forEach((person) => {
    if (person.state.toLowerCase() == state) {
      residents.push(person);
    }
  });

  if (residents.length == 0) {
    throw "State not found";
  }

  residents = [];
  const loop2 = peopleArr.forEach((person) => {
    if (person.city.toLowerCase() == city) {
      residents.push(person);
    }
  });

  if (residents.length == 0) {
    throw "City not found";
  }

  let result = [];
  const loop3 = peopleArr.forEach((person) => {
    if (
      person.state.toLowerCase() == state &&
      person.city.toLowerCase() == city
    ) {
      result.push(parseInt(person.postal_code));
    }
  });

  if (result.length == 0) {
    throw "No postal codes found";
  }

  result.sort((a, b) => a - b);
  return result;
};

const sameCityAndState = async (city, state) => {
  assertGoodString(city);
  assertGoodString(state);
  let residents = [];
  let peopleArr = await getPeople();
  city = city.toLowerCase();
  state = state.toLowerCase();

  const loop = peopleArr.forEach((person) => {
    if (
      person.state.toLowerCase() == state &&
      person.city.toLowerCase() == city
    ) {
      residents.push(person);
    }
  });

  if (residents.length < 2) {
    throw "There are not two people who live in the same city and state";
  }

  residents.sort((a, b) => {
    a.last_name - b.last_name;
  });

  let result = [];
  const loop2 = residents.forEach((person) => {
    result.push(person.first_name.concat(" ", person.last_name));
  });
  return result;
};

module.exports = {
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState,
};
