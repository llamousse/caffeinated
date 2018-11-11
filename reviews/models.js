'use strict';

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ReviewSchema = mongoose.Schema({
  review: {
    type: String,
    default: ""
  }
  // need to associate user withdb BUT RIGHT NOW  no user
  //is being saved in my DB??
  // should i send a user id with the post when thr user log in?
//  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

/// maybe it should be associated to a location?
});

ReviewSchema.methods.serialize = function() {
  return {
    review: this.review || ""
  };
};

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
