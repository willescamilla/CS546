const { movies } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const objId = require("mongodb").ObjectId;
const { stringChk, noSpacesChk } = require("../helpers");

const onlyNumChk = (string) => {
  // Check if string equals itself after removing everything except digits
  tempString = string.replace(/\D/g, "");
  if (tempString.localeCompare(string) !== 0) {
    throw new Error();
  }
};

const dateChk = (dateString) => {
  if (dateString.length !== 10) {
    throw new Error();
  }

  dateArr = [...dateString];

  // Check for '/'
  if (dateArr[2] !== "/" || dateArr[5] !== "/") {
    throw new Error();
  }

  monthString = dateArr[0] + dateArr[1];
  onlyNumChk(monthString);
  monthInt = parseInt(monthString);
  // Check for valid month
  if (monthInt < 1 || monthInt > 12) {
    throw new Error();
  }

  dayString = dateArr[3] + dateArr[4];
  onlyNumChk(dayString);
  dayInt = parseInt(dayString);
  // Check for valid day
  if (dayInt < 1 || dayInt > 31) {
    throw new Error();
  }

  // Months that have 30 days
  if (monthInt === 9 || monthInt === 4 || monthInt === 6 || monthInt === 11) {
    if (dayInt > 30) {
      throw new Error();
    }
  } else if (monthInt === 2) {
    // February only has 28 days
    if (dayInt > 28) {
      throw new Error();
    }
  }

  // Year must be > 1900 and < currYear+2
  yearString = dateArr[6] + dateArr[7] + dateArr[8] + dateArr[9];
  onlyNumChk(yearString);
  yearInt = parseInt(yearString);
  const currDate = new Date();
  if (yearInt < 1900 || yearInt > currDate.getFullYear() + 2) {
    throw new Error();
  }
};

const runtimeChk = (runtimeString) => {
  if (!runtimeString.includes("h") || !runtimeString.includes("min")) {
    throw new Error();
  }

  timeArr = [...runtimeString];
  hourString = "";
  let hLoc = 0;
  for (let i = 0; i < timeArr.length; i++) {
    if (timeArr[i] === "h") {
      hLoc = i;
      break;
    } else {
      hourString = hourString + timeArr[i];
    }
  }

  onlyNumChk(hourString);
  hourInt = parseInt(hourString);
  if (hourString.length > 2 || hourInt < 1 || hourInt > 23) {
    throw new Error();
  }

  minuteString = "";
  if (timeArr[hLoc + 1] !== " ") {
    throw new Error();
  }
  for (let i = hLoc + 2; i < timeArr.length; i++) {
    if (timeArr[i] === "m") {
      break;
    } else {
      minuteString = minuteString + timeArr[i];
    }
  }

  onlyNumChk(minuteString);
  minuteInt = parseInt(minuteString);
  if (minuteString.length > 2 || minuteInt < 0 || minuteInt > 59) {
    throw new Error("Minute error");
  }
};

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (
    !title ||
    !plot ||
    !genres ||
    !rating ||
    !studio ||
    !director ||
    !castMembers ||
    !dateReleased ||
    !runtime
  ) {
    throw new Error("All fields need to have valid values");
  }

  stringChk(title);
  stringChk(plot);
  stringChk(rating);
  stringChk(studio);
  stringChk(director);
  stringChk(dateReleased);
  stringChk(runtime);
  noSpacesChk(title);
  noSpacesChk(rating);
  noSpacesChk(dateReleased);

  if (typeof genres !== "object" || genres.length < 1) {
    throw new Error("Invalid genres");
  } else {
    genres.forEach((genre) => {
      stringChk(genre);
    });
  }

  if (typeof castMembers !== "object" || castMembers.length < 1) {
    throw new Error("Invalid castmembers");
  } else {
    castMembers.forEach((castmember) => {
      stringChk(castmember);
    });
  }

  dateChk(dateReleased);
  runtimeChk(runtime);

  const newMovie = {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
    reviews: [],
    overallRating: 0,
  };

  const moviesCollection = await movies();
  const infoInserted = await moviesCollection.insertOne(newMovie);
  if (infoInserted.insertedCount === 0) {
    throw new Error("Cannot add new movie");
  }

  const movieId = infoInserted.insertedId;
  const _movie = await getMovieById(movieId);

  return _movie;
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const allMovies = await moviesCollection.find({}).toArray();

  return allMovies;
};

const getMovieById = async (movieId) => {
  if (!movieId || (typeof movieId !== "string" && !objId.isValid(movieId))) {
    throw new Error("ID Invalid");
  }

  const moviesCollection = await movies();

  const _movie = await moviesCollection.findOne({
    _id: typeof movieId === "string" ? new objId(movieId) : movieId,
  });
  if (!_movie || _movie === null) {
    throw new Error("Movie not found");
  }

  return _movie;
};

const removeMovie = async (movieId) => {
  if (!movieId || (typeof movieId !== "string" && !objId.isValid(movieId))) {
    throw new Error("ID invalid");
  }

  let _movie = null;
  try {
    _movie = await getMovieById(movieId);
  } catch {
    throw new Error("Movie not found");
  }

  const moviesCollection = await movies();
  const infoDeleted = await moviesCollection.removeOne({
    _id: typeof movieId === "string" ? new objId(movieId) : movieId,
  });

  if (infoDeleted.deletedCount === 0) {
    throw new Error(`Unable to delete movie with movieId ${movieId}`);
  }

  return `${_movie.name} has been successfully deleted!`;
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  castMembers,
  dateReleased,
  runtime
) => {
  if (!movieId || (typeof movieId !== "string" && !objId.isValid(movieId))) {
    throw new Error("ID Invalid");
  }
  if (
    !title ||
    !plot ||
    !genres ||
    !rating ||
    !studio ||
    !director ||
    !castMembers ||
    !dateReleased ||
    !runtime
  ) {
    throw new Error("All fields need to have valid values");
  }

  stringChk(title);
  stringChk(plot);
  stringChk(rating);
  stringChk(studio);
  stringChk(director);
  stringChk(dateReleased);
  stringChk(runtime);
  noSpacesChk(title);
  noSpacesChk(rating);
  noSpacesChk(dateReleased);

  if (typeof genres !== "object" || genres.length < 1) {
    throw new Error("Invalid genres");
  } else {
    genres.forEach((genre) => {
      stringChk(genre);
    });
  }

  if (typeof castMembers !== "object" || castMembers.length < 1) {
    throw new Error("Invalid castmembers");
  } else {
    castMembers.forEach((castmember) => {
      stringChk(castmember);
    });
  }

  dateChk(dateReleased);
  runtimeChk(runtime);

  _movies = await getMovieById(movieId);

  const updatedMovie = {
    ..._movie,
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
  };

  const moviesCollection = await movies();
  const infoUpdated = await moviesCollection.replaceOne(
    {
      _id: typeof movieId === "string" ? new objId(movieId) : movieId,
    },
    updatedMovie
  );

  if (infoUpdated.modifiedCount === 0) {
    throw new Error(`Unable to update movie with movieId ${movieId}`);
  }

  const _updatedMovie = await getMovieById(movieId);

  return _updatedMovie;
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  removeMovie,
};
