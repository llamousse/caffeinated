import React from 'react';
import './index.css';

const oneItem = business => (
  <div id="business-info" key={business.id}>
    <a className="logo" href={business.url} target="_blank"></a>
    <h1 className="business-name">{business.name}</h1>
    <img className="business-pic" src="${business.image_url}" alt="" />
    <div className="body-content">
      <p>${business.price}</p>
      <p>Rating: {business.rating}/5</p>
      <p>Contact Business: {business.display_phone}</p>
      <p>Address: {business.location.display_address}</p>
      <p className="yelp-page">Click to visit Yelp page</p>
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
