/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */
const axios = require("axios");

async function getCompanies() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
  );
  return data; // this will be the array of company objects
}

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

const listEmployees = async (companyName) => {
  assertGoodString(companyName);
  let companyFound = null;
  let peopleArr = await getPeople();
  let companyArr = await getCompanies();
  let employees = [];
  companyName = companyName.toLowerCase();

  const loop = companyArr.forEach((company) => {
    if (company.name.toLowerCase() == companyName) {
      companyFound = company;
    }
  });

  if (companyFound == null) {
    throw "Company not found";
  }

  const loop2 = peopleArr.forEach((person) => {
    if (person.company_id === companyFound.id) {
      employees.push(person);
    }
  });

  employees.sort((a, b) => {
    a.last_name - b.last_name;
  });

  companyFound.employees = [];
  const loop3 = employees.forEach((person) => {
    companyFound.employees.push(
      person.first_name.concat(" ", person.last_name)
    );
  });

  return companyFound;
};

const sameIndustry = async (industry) => {
  assertGoodString(industry);
  industry = industry.toLowerCase();
  let companyArr = await getCompanies();
  let result = [];

  const loop = companyArr.forEach((company) => {
    if (company.industry.toLowerCase() == industry) {
      result.push(company);
    }
  });

  if (result.length == 0) {
    throw "No companies in this industry";
  }

  return result;
};

const getCompanyById = async (id) => {
  assertGoodString(id);
  let companyArr = await getCompanies();
  let result = null;

  const loop = companyArr.forEach((company) => {
    if (company.id == id) {
      result = company;
    }
  });

  if (result == null) {
    throw "Company not found";
  }

  return result;
};

module.exports = {
  listEmployees,
  sameIndustry,
  getCompanyById,
};
