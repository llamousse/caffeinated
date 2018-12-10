import React from 'react';
// import { Link } from 'react-router-dom';
// import './index.css';

const oneReview = reviewList => (
  <div>
    <p>{reviewList.review}</p>
  </div>

);

export const ReviewResults = (props) => (
  props.reviewList.map(item => oneReview(item))
);
