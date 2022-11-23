const { movies } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const objId = require("mongodb").ObjectId;
const { stringChk, noSpacesChk } = require("../helpers");
const { getAllMovies, getMovieById } = require("./movies");

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating) {
    throw new Error("All fields need to have valid values");
  }
  stringChk(reviewTitle);
  stringChk(reviewerName);
  stringChk(review);

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    throw new Error();
  }

  const _movie = await getMovieById(movieId);
  const moviesCollection = await movies();

  const newReview = {
    _id: objId(),
    reviewTitle,
    reviewDate: new Date(),
    reviewerName,
    review,
    rating,
  };

  const currReviews = _movie.reviews;
  currReviews.push(newReview);

  let sum = 0;
  currReviews.forEach((review) => {
    sum += review.rating;
  });
  const ratingAvg = sum / currReviews.length;
  const updatedMovie = {
    ..._movie,
    reviews: currReviews,
    overallRating: ratingAvg,
  };

  const infoUpdated = await moviesCollection.replaceOne(
    { _id: typeof movieId === "string" ? new objId(movieId) : movieId },
    updatedMovie
  );
  if (infoUpdated.modifiedCount === 0) {
    throw new Error();
  }

  const _updatedMovie = await getMovieById(movieId);

  return _updatedMovie;
};

const getAllReviews = async (movieId) => {
  const _movie = await getMovieById(movieId);
  const reviews = _movie.reviews;
  return reviews;
};

const arrayEquals = (a, b) => {
  return a.every((value, index) => value === b[index]);
};

const getReview = async (reviewId) => {
  if (!reviewId || !objId.isValid(reviewId) || typeof reviewId !== "string") {
    throw new Error("ID Invalid");
  }

  const moviesCollection = await movies();

  const allMovies = await getAllMovies();

  let _review = null;

  allMovies.forEach((movie) => {
    movie.reviews.forEach((review) => {
      if (arrayEquals([...review._id.toString()], [...reviewId])) {
        _review = review;
      }
    });
  });

  if (!_review || _review === null) {
    throw new Error("Review not found");
  }

  return _review;
};

const removeReview = async (reviewId) => {
  if (!reviewId || !objId.isValid(reviewId) || typeof reviewId !== "string") {
    throw new Error("ID Invalid");
  }

  const moviesCollection = await movies();
  const allMovies = await getAllMovies();

  let someInfo = {};
  allMovies.forEach((movie) => {
    movie.reviews.forEach((review) => {
      if (arrayEquals([...review._id.toString()], [...reviewId])) {
        someInfo = {
          movieId: movie._id,
          reviewId: review._id,
        };
      }
    });
  });

  if (!someInfo || someInfo === null) {
    throw new Error();
  }
  const _movie = await getMovieById(someInfo.movieId);
  const currReviews = _movies.reviews;
  const remainingReviews = currReviews.filter((review) => {
    return !arrayEquals(
      [...review._id.toString()],
      [...someInfo.reviewId.toString()]
    );
  });

  let sum = 0;
  remainingReviews.forEach((review) => {
    sum += review.rating;
  });
  const ratingAvg = sum / remainingReviews.length;

  const updatedMovie = {
    ..._movie,
    overallRating: ratingAvg,
    reviews: remainingReviews,
  };
  const infoUpdated = await moviesCollection.replaceOne(
    {
      _id:
        typeof someInfo.movieId === "string"
          ? new objId(someInfo.movieId)
          : someInfo.movieId,
    },
    updatedMovie
  );

  if (infoUpdated.modifiedCount === 0) {
    throw new Error(`Unable to remove review with reviewId ${reviewId}`);
  }

  const _updatedMovie = await getMovieById(someInfo.movieId);
  return _updatedMovie;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
};
