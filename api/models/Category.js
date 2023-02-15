const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cat: {
    type: String,
    require: true,
    unique: true,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);