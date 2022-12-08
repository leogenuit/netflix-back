const router = require("express").Router();
const Favori = require("./../models/Favoris.model");
const isAuthenticated = require("../middlewares/jwt.middleware");

router.get("/favori", isAuthenticated, async (req, res, next) => {
  try {
    const allFavoris = await Favori.find({ user: req.payload.id }).populate(
      "movie"
    );
    res.json(allFavoris);
  } catch (error) {
    next(error);
  }
});

router.post("/favori/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const fav = await Favori.create({ user: req.payload.id, movie: id });
    res.status(201).json(fav);
  } catch (error) {
    next(error);
  }
});

router.get("/favori/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const fav = await Favori.findOne({ user: req.payload.id, movie: id });
    res.status(200).json(fav);
  } catch (error) {
    next(error);
  }
});

router.delete("/favori/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Favori.findOneAndDelete({
      user: req.payload.id,
      movie: req.params.id,
    });
    res.status(204).json({ message: "Deleted!" + req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
