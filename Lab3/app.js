/* William Escamilla I pledge my honor that I have abided by the Stevens Honor System.
 */
const people = require("./people");
const companies = require("./companies");

async function main() {
  // people.js tests
  try {
    const pass = await people.getPersonById(
      "fa36544d-bf92-4ed6-aa84-7085c6cb0440"
    );
    //console.log(pass);
    console.log("getPersonById passed successfully");

    const fail = await people.getPersonById(
      "7989fa5e-5617-43f7-a931-46036f9dbcff"
    );
  } catch (e) {
    console.log(e);
    console.log("getPersonById failed successfully");
  }
  try {
    const pass = await people.sameJobTitle("Help Desk Operator");
    //console.log(pass);
    console.log("sameJobTitle passed successfully");

    const fail = await people.sameJobTitle("farmer");
  } catch (e) {
    console.log(e);
    console.log("sameJobTitle failed successfully");
  }
  try {
    const pass = await people.getPostalCodes("Salt Lake City", "Utah");
    //console.log(pass);
    console.log("getPostalCodes passed successfully");

    const fail = await people.getPostalCodes("Bayside", "New York");
  } catch (e) {
    console.log(e);
    console.log("getPostalCodes failed successfully");
  }
  try {
    const pass = await people.sameCityAndState("Salt Lake City", "Utah");
    //console.log(pass);
    console.log("sameCityAndState passed successfully");

    const fail = await people.sameCityAndState("Bayside", "New York");
  } catch (e) {
    console.log(e);
    console.log("sameCityAndState failed successfully");
  }

  //companies.js test cases
  try {
    const pass = await companies.listEmployees("Will-Harvey");
    //console.log(pass);
    console.log("listEmployees passed successfully");

    const fail = await companies.listEmployees("foobar");
  } catch (e) {
    console.log(e);
    console.log("listEmployees failed successfully");
  }
  try {
    const pass = await companies.sameIndustry("Auto Parts:O.E.M.");
    //console.log(pass);
    console.log("sameIndustry passed successfully");

    const fail = await companies.sameIndustry("foobar");
  } catch (e) {
    console.log(e);
    console.log("sameIndustry failed successfully");
  }
  try {
    const pass = await companies.getCompanyById(
      "fb90892a-f7b9-4687-b497-d3b4606faddf"
    );
    //console.log(pass);
    console.log("getCompanyById passed successfully");

    const fail = await companies.getCompanyById("foobar");
  } catch (e) {
    console.log(e);
    console.log("getCompanyById failed successfully");
  }
}

main();
