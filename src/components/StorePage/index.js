import React from 'react';

import { ListOfItems } from '../../components/ListOfItems';
import LogoWhite from '../../images/LogoWhite.png';
import './index.css';

export default class StorePage extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     busClicked : false,
  //     business: null
  //   };
  //   this.updateData = this.updateData.bind(this);
  // }



  render() {
    return(
      <div className="storePage">
      	<div className="navBarLanding">
          <a href="/">
            <img src={LogoWhite} alt="logo" className="logoNav" />
            <p className="titleNav">Caffeinated</p>
          </a>
        </div>

      </div>
    );
  }
}
