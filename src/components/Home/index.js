import React, { Component } from 'react';

import { ReviewShops } from '../../components/ReviewShops';
import { DiscoverShops } from '../../components/DiscoverShops';
import { ListOfItems } from '../../components/ListOfItems';
import Search from '../../components/Search';
import { WriteReview } from '../../components/WriteReview';

import './index.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchClicked : false,
      business: null
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData(data) {
    //setting the state business with the fake data
    this.setState({
      business: data,
      searchClicked: true
    })
  }

  shopResults() {
    return this.state.searchClicked ?
     <ListOfItems business={this.state.business}/> :
     <div>
       <ReviewShops />
       <DiscoverShops />
     </div>
  }

  render() {
    console.log("here is the data from the server", this.state.business);
    return (
      <div>
          <div id="root">
            <main>
              <Search
               auth={this.props.auth}
               updateData={this.updateData}/>
              { this.shopResults() }
              { /* <WriteReview /> */}

            </main>
          </div>
          {/* <footer className="footerInfo">&copy; 2018 Vicky Yue</footer> */}
        </div>
    );
  }
}
