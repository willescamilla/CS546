//An index file that exports all other data access modules
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/code/data/index.js
const pokeData = require("./pokemon");

module.exports = {
  pokeApi: pokeData,
};
