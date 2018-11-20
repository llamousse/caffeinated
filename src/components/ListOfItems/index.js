import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const oneItem = business => (
  <div id="businessInfo" key={business.id}>
    <img className="businessPic" src={business.image_url} alt=""/>
    <div className="descSection">
      <a href={business.url} target="_blank" className="businessName">{business.name}</a>
      <div className="bodyContent">
        <p>${business.price}</p>
        <p>Rating: {business.rating}/5</p>
        <p>Contact: {business.display_phone}</p>
        <p>Address: {business.location.display_address.join(", ")}</p>
      </div>
      <button className="reviewButton">
        <Link to="/writeReview" className="reviewBus">Write Review</Link>
      </button>
    </div>

  </div>
);

export const ListOfItems = (props) => (
  props.business.map(item => oneItem(item))
);


// Log In, Log Out + React Router to Link Pages
// think about app functionalities

// Functions
// 1. log in account to write REVIEWS + see reviews
//    user has written -> also other reviews from Yelp
//    too .. 2 APIs together?
// 1. log in account to write REVIEWS + see your own
//    reviews ONLY . if want to see Yelp reviews, don't
//    need account
