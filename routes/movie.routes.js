const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin.middleware");
const protectRoute = require("../middlewares/protectRoute");
const Movie = require("./../models/Movie.model");
const Category = require("./../models/Category.model");

// ALL MOVIES
router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (error) {
    next(error);
  }
});

// ONE MOVIE
router.get("/movies/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const oneMovie = await Movie.findById(req.params.id).populate("category");
    res.status(200).json(oneMovie);
  } catch (error) {
    next(error);
  }
});

router.use(protectRoute);
router.use(isAdmin);

// CREATE A MOVIE
router.post("/movies", async (req, res, next) => {
  const { title, description, category, img, video, year } = req.body;

  const movie = await Movie.create({
    title,
    description,
    img,
    category,
    video,
    year,
  });
  res.status(201).json(movie);
});

// DELETE A MOVIE
router.delete("/movies/:id", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Deleted!" + req.params.id });
  } catch (error) {
    next(error);
  }
});

// UPDATE A MOVIE

router.patch("/movies/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, img, description, video, year } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, img, description, video, year },
      {
        new: true,
      }
    );
    res.json(updatedMovie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
