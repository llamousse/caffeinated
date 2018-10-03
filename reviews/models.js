'use strict';

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now()
  },
  description: {
    type: String,
    default: ""
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

ReviewSchema.methods.serialize = function() {
  return {
    id: this.id,
    title: this.title || "",
    date: this.date || Date.now(),
    description: this.description || ""
  };
};

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
