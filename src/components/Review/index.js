import React from 'react';

import './index.css';

export class Review extends React.Component {
  render() {
    return(
      <div>
        <nav role="navigation">(Logo) Complete Your Review</nav>
      	<h3>Intelligentsia</h3>
      	<div className="review">
      		<textarea
            className="postField"
            placeholder="Your review will be helpful to others looking for great local coffee, tea, and bubble tea businesses!"
            id="postReview"></textarea>
      	</div>
      	<button type='submit'>Post Review</button>
      </div>
    );
  }
}
