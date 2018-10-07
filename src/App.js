import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav role="navigation">
          Write a Review
          <div className="topnav">
            <a href="#login">Log In</a>
            <a href="#signup">Sign Up</a>
          </div>
        </nav>

        <main role="main">
          <header role="banner">
            <h1>Caffeinated</h1>
            <form className="find-form">
              <div>
                <label for="boba-coffee">Find</label>
                <input placeholder="coffee, tea" type="text" name="beverage-type" id="beverage-type" />
              </div>
            </form>
            <form className="location-form">
              <div>
                <label for="location-search">Location</label>
                <input placeholder="Los Angeles, CA" type="text" name="location" id="location" />
              </div>
            </form>
            <button type='submit'>Sign Up</button>
          </header>

          <section>
            <header>
              <h3>Review Local Coffee & Tea Shops</h3>
            </header>
            <p>[<em>placeholder for image example #1</em>]</p>
            <p>[<em>placeholder for image example #2</em>]</p>
          </section>

          <section>
            <header>
              <h3>Discover Local Coffee & Tea Shops in the Area</h3>
            </header>
            <p>[<em>placeholder for image example #1</em>]</p>
            <p>[<em>placeholder for image example #2</em>]</p>
            <p>[<em>placeholder for image example #3</em>]</p>
          </section>
        </main>

        <footer role="content-info">&copy;2018</footer>
      </div>
    );
  }
}

export default App;
