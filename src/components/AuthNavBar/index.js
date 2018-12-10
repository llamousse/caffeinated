import React from 'react';

import LogoWhite from '../../images/LogoWhite.png';
import './index.css';

export default class AuthNavBar extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {

   const { isAuthenticated } = this.props.auth;

    return (
      <div className="navBarLanding" role="navigation">
        <a href="/">
          <img src={LogoWhite} alt="logo" className="logoNav" />
        </a>

        {
          !isAuthenticated() && (
            <a className="loginSpace"
              href="#"
              onClick={this.login.bind(this)}
             >Log In</a>
            )
        }
        {
          isAuthenticated() && (
            <a className="loginSpace"
              href="#"
              onClick={this.logout.bind(this)}
             >Log Out</a>
            )
        }
      </div>
    );
  }
}
