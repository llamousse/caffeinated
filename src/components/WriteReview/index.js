import React from 'react';

import LogoWhite from '../../images/LogoWhite.png';
import Footer from '../../components/Footer';

import { ListOfItems } from '../../components/ListOfItems';
import './index.css';

export default class WriteReview extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //
  //   // };
  //   this.submitPostReview = this.submitPostReview.bind(this);
  // }

  // submitPostReview(e) {
  //   e.preventDefault();
  //
  //
  // }

  render() {
    return(
      <div id="writeReview">
      	<nav className="reviewNav" role="navigation">
          <a href="/">
            <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
          </a>
          Complete Your Review
        </nav>

      	<h3 className="busName">Shop Name Here</h3>

      	<div className="review">
      		<textarea className="postField"
            placeholder="Your review will be helpful for others looking for other great local coffee, tea, and bubble tea shops!"
      		 id="postReview" required></textarea>
      	</div>

      	<button className="postButton" type="submit"
          name="submit" id="postButton"
          onSubmit={this.submitPostReview}>Post Review</button>

        <div className="push"></div>

        <Footer />

      </div>
    );
  }
}
