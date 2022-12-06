const router = require("express").Router();
const Category = require("../models/Category.model");

router.get("/category", async (req, res, next) => {
  try {
    const allCategory = await Category.find();
    res.json(allCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
