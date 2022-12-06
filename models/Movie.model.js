const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Movie", movieSchema);
