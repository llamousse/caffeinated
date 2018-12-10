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

      <Link to="/writeReview" className="reviewBus">
      <button className="reviewButton">Write Review</button>
      </Link>

    </div>

  </div>
);

export const ListOfItems = (props) => (
  props.business.map(item => oneItem(item))
);
