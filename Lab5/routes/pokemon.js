//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require("express");
const router = express.Router();
const data = require("../data");
const { stringChk } = require("../helpers");
const pokeApi = data.pokeApi;

router.route("/pokemon").get(async (req, res) => {
  try {
    const allPoke = await pokeApi.pokemon();
    return res.json(allPoke);
  } catch (e) {
    // Server error
    return res.status(500).send();
  }
});
//Request Method

router.route("/pokemon/:id").get(async (req, res) => {
  try {
    stringChk(req.params.id);
  } catch (e) {
    return res.status(400).json({ message: "Invalid URL Parameter" });
  }

  try {
    const onePoke = await pokeApi.pokemonById(parseInt(req.params.id));
    return res.json(onePoke);
  } catch (e) {
    return res.status(404).json({ message: "Pokémon Not Found!" });
  }
});
//Request Method

module.exports = router;
