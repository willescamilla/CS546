const { dbConnection, closeConnection } = require("./config/mongoConnection");
const { createMovie } = require("./data/movies");
const {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
} = require("./data/reviews");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const movie1 = await createMovie(
    "Hackers",
    "Hackers are blamed for making a virus that will capsize five oil tankers.",
    ["Crime", "Drama", "Romance"],
    "PG-13",
    "United Artists",
    "Iain Softley",
    ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
    "09/15/1995",
    "1h 45min"
  );
  const movie1_r1 = await createReview(
    movie1._id,
    "Meh...",
    "Patrick Hill",
    "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic",
    3.5
  );
  const movie1_r2 = await createReview(
    movie1._id,
    "Okay Movie",
    "Will Escamilla",
    "Almost fell asleep but some good action",
    4
  );
  const movie1_r3 = await createReview(
    movie1._id,
    "Great Movie!",
    "Joe Mama",
    "I cant stop watching it",
    5
  );
  const movie2 = await createMovie(
    "Interstellar",
    "Dad figures out love can cross dimensions",
    ["Syfy", "Drama", "Thriller"],
    "PG-13",
    "Skydance",
    "Christopher Nolan",
    [
      "Matthew Macognogoehh",
      "Timothee Chalemet",
      "Casey Affleck",
      "Jessica Chastain",
    ],
    "02/02/2014",
    "2h 32min"
  );
  const movie2_r1 = await createReview(
    movie2._id,
    "Meh...",
    "Patrick Hill",
    "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic",
    3.5
  );
  const movie2_r2 = await createReview(
    movie2._id,
    "Okay Movie",
    "Will Escamilla",
    "Almost fell asleep but some good action",
    4
  );
  const movie2_r3 = await createReview(
    movie2._id,
    "Great Movie!",
    "Joe Mama",
    "I cant stop watching it",
    5
  );
  const movie3 = await createMovie(
    "Nope",
    "Something in that cloud",
    ["Syfy", "Drama", "Thriller", "Horror"],
    "R",
    "Little Monkey",
    "Jordan Peele",
    ["Daniel Kaluuya", "Keke Palmer", "Brandon Perea"],
    "09/20/2022",
    "1h 30min"
  );
  const movie3_r1 = await createReview(
    movie3._id,
    "Meh...",
    "Patrick Hill",
    "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic",
    3.5
  );
  const movie3_r2 = await createReview(
    movie3._id,
    "Okay Movie",
    "Will Escamilla",
    "Almost fell asleep but some good action",
    4
  );
  const movie3_r3 = await createReview(
    movie3._id,
    "Great Movie!",
    "Joe Mama",
    "I cant stop watching it",
    5
  );
  const movie4 = await createMovie(
    "Halloween",
    "Fifteen years after murdering his sister on Halloween night 1963, Michael Meyers comes back for more",
    ["Thriller", "Horror"],
    "R",
    "Compass International Pictures",
    "John Carpenter",
    ["Donald Pleasence", "Jamie Lee Curtis", "Nancy Kyes", "P.J. Soles"],
    "10/31/1978",
    "1h 31min"
  );
  const movie4_r1 = await createReview(
    movie4._id,
    "Meh...",
    "Patrick Hill",
    "This movie was good.  It was entertaining, but as someone who works in IT, it was not very realistic",
    3.5
  );
  const movie4_r2 = await createReview(
    movie4._id,
    "Okay Movie",
    "Will Escamilla",
    "Almost fell asleep but some good action",
    4
  );
  const movie4_r3 = await createReview(
    movie4._id,
    "Great Movie!",
    "Joe Mama",
    "I cant stop watching it",
    5
  );

  console.log("Done seeding db.");
  await db.s.client.close();
};

main();
