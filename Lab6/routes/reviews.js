const express = require("express");
const { getAllMovies, getMovieById } = require("../data/movies");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
} = require("../data/reviews");
const objId = require("mongodb").ObjectId;

const {
  validateString,
  validateNoSpaces,
  validateOnlyNumbers,
} = require("../helpers");

const validateReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating) {
    throw new Error("All fields need to have valid values");
  }
  validateString(reviewTitle);
  validateString(reviewerName);
  validateString(review);

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return false;
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
    return false;
  }

  return true;
};

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      let reviews = null;
      try {
        reviews = await getAllReviews(req.params.movieId);
      } catch (e) {
        res.status(404).json({ message: "Not found!" });
      }
      res.json(reviews);
    } catch (e) {
      res.status(500).send();
    }
  })
  .post(async (req, res) => {
    const data = req.body;
    if (
      !validateReview(
        req.params.movieId,
        data.reviewTitle,
        data.reviewerName,
        data.review,
        data.rating
      )
    ) {
      res.status(400).send();
    }

    try {
      let movie = null;
      try {
        movie = await createReview(
          req.params.movieId,
          data.reviewTitle,
          data.reviewerName,
          data.review,
          data.rating
        );
      } catch (e) {
        res.status(400).json({ message: "Error Creating Review!" });
      }
      res.json(movie);
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    try {
      let review = null;
      try {
        review = await getReview(req.params.reviewId);
      } catch (e) {
        res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (e) {
      res.status(500).send();
    }
  })
  .delete(async (req, res) => {
    try {
      let movie = null;
      try {
        movie = await removeReview(req.params.reviewId);
      } catch (e) {
        res.status(404).json({ message: "Review not found" });
      }
      res.json({ reviewId: req.params.reviewId, deleted: true });
    } catch (e) {
      res.status(500).send();
    }
  });

module.exports = router;
