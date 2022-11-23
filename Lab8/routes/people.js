//Require express and express router as shown in lecture code and worked in previous labs
const express = require("express");
const { searchPeople } = require("../data/index");
const router = express.Router();
const path = require("path");

router.route("/").get(async (req, res) => {
  res.sendFile(path.resolve("./static/homepage.html"));
});

router.route("/searchpeople").post(async (req, res) => {
  const personName = req.body.searchPersonName;
  if (!personName) {
    res.status(400).render("error", {
      title: "Error",
      error: "Input is empty",
    });
    return;
  }
  if (personName.trim().length <= 0) {
    res.status(400).render("error", {
      title: "Error",
      error: "Input is whitespace",
    });
    return;
  }
  const searchResults = await searchPeople.searchPeopleByName(personName);
  res.render("peopleFound", {
    title: "People Found",
    searchPersonName: personName,
    people: searchResults,
  });
});

router.route("/persondetails/:id").get(async (req, res) => {
  let id = req.params.id;
  if (isNaN(id) || parseInt(id) < 1 || parseInt(id) > 190000) {
    res.status(400).render("error", {
      title: "Error",
      error: "Id invalid",
    });
    return;
  }
  let searchResult = await searchPeople.searchPeopleByID(id);
  if (!searchResult) {
    res.status(404).render("personNotFound", {
      title: "Error",
      error: "No person found with this ID",
    });
    return;
  }
  res.render("personFoundByID", {
    title: "Person Found",
    person: searchResult,
  });
});

module.exports = router;
