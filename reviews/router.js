"use strict";

const express = require("express");
// const passport = require('passport');
const bodyParser = require("body-parser");
const { Review } = require("./models");
const router = express.Router();

const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  Review.find(req.review)
    .then(reviews => {
      res.json(reviews.map(review => review.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

// GET to get the location of place?
// router.get("/", (req, res) => {
//   Review.find(req.location)
//     .then(locations => {
//       res.json(locations.map(location => location.serialize()));
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({error: "something went wrong"});
//     });
// });

router.get("/yelp-search", (req, res) => {
  Review.find(req.location)
    .then(locations => {
      res.json(locations.map(location => location.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: "something went wrong"});
    });
});

router.post("/", jsonParser, (req, res) => {
  const requiredField = ['review'];
  requiredField.forEach(field => {
    if (!(field in req.body)) {
      const message = `Error: Please write a review to post`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Review.create({
    review: req.body.review
    // location: req.body.location
    })

    .then(Review => res.status(201).json(Review.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
});

// router.delete("/:id", (req, res) => {
//   Review.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.status(204).json({ message: "success" });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: "something went terribly wrong" });
//     });
// });

// router.put("/:id", (req, res) => {
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     res.status(400).json({
//       error: "Request path id and request body id values must match"
//     });
//   }
//
//   const updated = {};
//   const updateableFields = ["title", "date", "description"];
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       updated[field] = req.body[field];
//     }
//   });
//
//   Review.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
//     .then(updatedPost => res.status(204).end())
//     .catch(err => res.status(500).json({ message: "something went wrong" }));
// });

module.exports = { router };
