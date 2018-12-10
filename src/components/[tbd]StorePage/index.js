import React from 'react';

// import { ListOfReviews } from '../../components/ListOfReviews';
// import WriteReview from '../../components/WriteReview';
import LogoWhite from '../../images/LogoWhite.png';
import './index.css';

export default class StorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      reviewPosted: false
    };
    // this.updateRev = this.updateRev.bind(this);
  }

  // updateRev(dataRecd) {
  //   this.setState({
  //     reviewlist: dataRecd,
  //     reviewPosted: true
  //   })
  // }

  reviewResults() {
    return this.state.reviewPosted ?
    <ListOfReviews review={this.state.reviewList}/> :
    <div></div>
  }

  render() {
    return(
      <div className="storePage">
      	<div className="navBarLanding">
          <a href="/">
            <img src={LogoWhite} alt="logo" className="logoNav" />
            <p className="titleNav">Caffeinated</p>
          </a>
        </div>

        { this.reviewResults() }

      </div>
    );
  }
}
