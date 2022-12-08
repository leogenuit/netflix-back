require("dotenv").config("../");
require("../config/dbConfig");
const movies = require("./movies.data.json");
const categories = require("./category.js");
const Category = require("../models/Category.model");
const Movie = require("../models/Movie.model");
const mongoose = require("mongoose");
const Favoris = require("../models/Favoris.model");

async function seed() {
  await Movie.deleteMany();
  await Category.deleteMany();
  await Favoris.deleteMany();

  const createdCategories = await Category.create(
    categories.map((category) => {
      return { name: category };
    })
  );
  // const categoryIds = {};

  // createdCategories.forEach((category) => {
  //   categoryIds[category.name] = category.id;
  // });
  // console.log(categoryIds);

  for (const movie of movies) {
    const catArray = [];
    for (const cat of movie.category) {
      const dbCategory = await Category.findOne({ name: cat });
      console.log(cat);
      catArray.push(dbCategory._id);
    }
    movie.category = catArray;
  }

  await Movie.create(movies);
  // const createdMovies = await Movie.create(
  //   JSON.parse(JSON.stringify(movies)).map((movie) => {
  //     delete movie.category;
  //     return movie;
  //   })
  // );
  // const allMovies = await Movie.findOne().populate("category");
  // console.log(allMovies);

  // const oneMovie = await Movie.findById(allMovies.id).populate("category");

  // console.log(oneMovie);
  // for (const movie of allMovies) {
  //   console.log(movie._id);
  //   // for (const item of movie.category) {
  //   //   console.log(item.name);
  //   // }
  // }

  // const promiseArray = movies.map((movie, i) => {
  //   return Movie.findByIdAndUpdate(createdMovies[i].id, {
  //     $push: {
  //       category: movie.category.map((category) => {
  //         return categoryIds[category];
  //       }),
  // },
  //   });
  // });

  // const allMovies = await Promise.all(promiseArray);

  await mongoose.disconnect();
}

seed();
