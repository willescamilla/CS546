const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  removeMovie,
} = require("../data/movies");
const objId = require("mongodb").ObjectId;
const {
  validateString,
  validateNoSpaces,
  validateOnlyNumbers,
} = require("../helpers");

const validateDate = (dateString) => {
  if (dateString.length !== 10) {
    return false;
  }

  dateArr = [...dateString];

  // Check for '/'
  if (dateArr[2] !== "/" || dateArr[5] !== "/") {
    return false;
  }

  monthString = dateArr[0] + dateArr[1];
  if (!validateOnlyNumbers(monthString)) {
    return false;
  }
  monthInt = parseInt(monthString);
  // Check for valid month
  if (monthInt < 1 || monthInt > 12) {
    return false;
  }

  dayString = dateArr[3] + dateArr[4];
  if (!validateOnlyNumbers(dayString)) {
    return false;
  }
  dayInt = parseInt(dayString);
  // Check for valid day
  if (dayInt < 1 || dayInt > 31) {
    return false;
  }

  // Months that have 30 days
  if (monthInt === 9 || monthInt === 4 || monthInt === 6 || monthInt === 11) {
    if (dayInt > 30) {
      return false;
    }
  } else if (monthInt === 2) {
    // February only has 28 days
    if (dayInt > 28) {
      return false;
    }
  }

  // Year must be > 1900 and < currYear+2
  yearString = dateArr[6] + dateArr[7] + dateArr[8] + dateArr[9];
  if (!validateOnlyNumbers(yearString)) {
    return false;
  }
  yearInt = parseInt(yearString);
  const currDate = new Date();
  if (yearInt < 1900 || yearInt > currDate.getFullYear() + 2) {
    return false;
  }
  return true;
};

const validateRuntime = (runtimeString) => {
  if (!runtimeString.includes("h") || !runtimeString.includes("min")) {
    return false;
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

  if (!validateOnlyNumbers(hourString)) {
    return false;
  }
  hourInt = parseInt(hourString);
  if (hourString.length > 2 || hourInt < 1 || hourInt > 23) {
    return false;
  }

  minuteString = "";
  if (timeArr[hLoc + 1] !== " ") {
  }
  for (let i = hLoc + 1; i < timeArr.length; i++) {
    if (timeArr[i] === "m") {
      break;
    } else {
      minuteString = minuteString + timeArr[i];
    }
  }

  if (!validateOnlyNumbers(minuteString)) {
    return false;
  }
  minuteInt = parseInt(minuteString);
  if (minuteString.length > 2 || minuteInt < 0 || minuteInt > 59) {
    return false;
  }
  return true;
};

const validateMovie = async (
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
    return false;
  }

  if (!validateString(title)) {
    return false;
  }
  if (!validateString(plot)) {
    return false;
  }
  if (!validateString(rating)) {
    return false;
  }
  if (!validateString(studio)) {
    return false;
  }
  if (!validateString(director)) {
    return false;
  }
  if (!validateString(dateReleased)) {
    return false;
  }
  if (!validateString(runtime)) {
    return false;
  }
  if (!validateNoSpaces(title)) {
    return false;
  }
  if (!validateNoSpaces(rating)) {
    return false;
  }
  if (!validateNoSpaces(dateReleased)) {
    return false;
  }

  if (typeof genres !== "object" || genres.length < 1) {
    return false;
  } else {
    genres.forEach((genre) => {
      if (!validateString(genre)) {
        return false;
      }
    });
  }

  if (typeof castMembers !== "object" || castMembers.length < 1) {
    return false;
  } else {
    castMembers.forEach((castmember) => {
      if (!validateString(castmember)) {
        return false;
      }
    });
  }

  if (!validateDate(dateReleased)) {
    return false;
  }
  if (!validateRuntime(runtime)) {
    return false;
  }

  return true;
};

router
  .route("/")
  .get(async (req, res) => {
    try {
      const movies = await getAllMovies();
      let simpleMovies = [];
      movies.forEach((movie) => {
        simpleMovies.push({
          _id: movie._id,
          title: movie.title,
        });
      });

      res.json(simpleMovies);
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send();
    }
  })
  .post(async (req, res) => {
    const data = req.body;

    if (
      !validateMovie(
        data.title,
        data.plot,
        data.genres,
        data.rating,
        data.studio,
        data.director,
        data.castMembers,
        data.dateReleased,
        data.runtime
      )
    ) {
      res.status(400).json({ error: "All fields need to have valid values" });
    }

    try {
      const movie = await createMovie(
        data.title,
        data.plot,
        data.genres,
        data.rating,
        data.studio,
        data.director,
        data.castMembers,
        data.dateReleased,
        data.runtime
      );
      res.json(movie);
      res.status(200).send();
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send();
    }
  });

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      let movie = null;
      try {
        movie = await getMovieById(req.params.movieId);
      } catch (e) {
        res.status(404).json({ message: "Movie Not Found!" });
      }
      res.json(movie);
    } catch (e) {
      res.status(500).send();
    }
  })
  .delete(async (req, res) => {
    try {
      let movie = null;
      try {
        movie = await removeMovie(req.params.movieId);
      } catch (e) {
        res.status(404).json({ message: "Movie Not Found!" });
      }
      res.json({ movieId: req.params.movieId, deleted: true });
    } catch (e) {
      res.status(500).send();
    }
  })
  .put(async (req, res) => {
    const data = req.body;

    if (
      !validate(
        data.title,
        data.plot,
        data.genres,
        data.rating,
        data.studio,
        data.director,
        data.castMembers,
        data.dateReleased,
        data.runtime
      )
    ) {
      res.status(400).json({ error: "All fields need to have valid values" });
    }

    try {
      let movie = null;
      try {
        movie = await updateMovie(
          req.params.movieId,
          data.title,
          data.plot,
          data.genres,
          data.rating,
          data.studio,
          data.director,
          data.castMembers,
          data.dateReleased,
          data.runtime
        );
      } catch (e) {
        res.status(404).json({ message: "Movie Not Found!" });
      }
      res.json(movie);
      res.status(200).send();
    } catch (e) {
      // Something went wrong with the server!
      res.status(500).send();
    }
  });

module.exports = router;
