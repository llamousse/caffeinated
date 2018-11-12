import React, { Component } from 'react';

import './index.css';

export default class ArrowDown extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     active: false,
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  // }
  //
  // handleClick() {
  //   const currentState = this.state.active;
  //   this.setState({
  //     active: !currentState
  //   })
  // }

  render() {
    return (
      <div className="arrowDown">
        <a href="#discoverShops" className="discoverTag">V</a>
      </div>
    );
  }
}
