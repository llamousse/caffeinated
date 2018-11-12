import React from 'react';

import DiscoverTea from '../../images/DiscoverTea.jpg';
import DiscoverCoffee from '../../images/DiscoverCoffee.jpg';
import './index.css';

export class DiscoverShops extends React.Component {
  render() {
    return (
      <div id="discoverShops" className="discoverContainer">
        <h2 className="discoverHeader">Discover Local Coffee & Tea, and </h2>
        <h2 className="discoverHeaderBot">Bubble Tea Shops in the Area</h2>

        <img src={DiscoverTea} alt="teaDiscover" className="reviewImg teaDiscover" />
        <img src={DiscoverCoffee} alt="coffeeDiscover" className="reviewImg coffeeDiscover" />
      </div>
    );
  }
}
