import React from 'react';

import ReviewCoffee from '../../images/ReviewCoffee.jpg';
import ReviewBubble from '../../images/ReviewBubble.jpg';
import './index.css';


export class ReviewShops extends React.Component {
  render () {
    return (
      <div className="reviewContainer">
        <h2 className="reviewHeaderTop">Review Local Coffee & Tea, and</h2>
        <h2 className="reviewHeaderBot">Bubble Tea Shops</h2>

        <img src={ReviewCoffee} alt="coffeeReview" className="reviewImg coffeeReview" />
        <img src={ReviewBubble} alt="bobaReview" className="reviewImg bobaReview" />
      </div>
    );
  }
}
