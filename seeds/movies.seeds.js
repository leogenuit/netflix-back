require("dotenv").config("../");
require("../config/dbConfig");
const movies = require("./movies.data.json");
const Movie = require("../models/Movie.model");
const mongoose = require("mongoose");

async function seed() {
  await Movie.deleteMany();
  await Movie.create(movies);
  await mongoose.disconnect();
}

seed();
