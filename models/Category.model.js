const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    genre: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
