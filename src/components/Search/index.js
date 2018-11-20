import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
//this is the navbar?
import AppAuth from '../../components/AppAuth';
import ArrowDown from '../../components/ArrowDown';
import LogoRed from '../../images/LogoRed.png';
import './index.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      beverageValue: 'coffee',
      location: '',
      shopData: []
    };
    this.submitSearchForm = this.submitSearchForm.bind(this);
  }

  submitSearchForm(e) {
    e.preventDefault();

    const beverageValue = this.state.beverageValue;
    const location = this.state.location;
    const { updateData } = this.props;

    console.log("i clicked submit", beverageValue, location);

    fetch("http://localhost:8080/yelp-search?location="+`${location}`+"&term="+`${beverageValue}`)
      .then(res =>
       res.json().then(
         data => updateData(data.businesses),
         console.log("here is the response", res)
      ));

/*    fetch("http://localhost:8080/yelp-reviews")
      .then(res =>
        res.json().then(
          reviewData => displayYelpReviews(reviewData.reviews),
          res => console.log("here are the reviews", res)
      )); */
  }

  render() {
    return (
      <div>
        <AppAuth auth={this.props.auth}/>
        <div className="bg">
          <div className="centerLogo">
            <div className="whiteBg">
            <img src={LogoRed} alt="logo" className="logoImg" />
            <h1>Caffeinated</h1>

            <form className="searchBar" onSubmit={this.submitSearchForm}>
                <label htmlFor="beverageType">Find</label>
                {" "}
                <select
                  className="dropDown"
                  onChange={e => this.setState({beverageValue: e.target.value})}
                  value={this.state.beverageValue}>
                   <option value="coffee">Coffee & Tea</option>
                   <option value="bubbletea">Bubble Tea</option>
                </select>

                <label htmlFor="location">Location</label>
                {" "}
                <Autocomplete
                  onPlaceSelected={(place) => {
                    // console.log(place);
                    const locationValue = `${place.formatted_address}`;
                    // console.log(locationValue);
                    this.setState({location: locationValue});
                  }}
                  types={['(regions)']}
                  className="locationInput"
                  placeholder="Los Angeles, CA"
                  type="text"
                  name="location"
                  id="location"
                />
                <button className="searchSubmitBtn"
                  type="submit"
                  name="submit"
                >
                  Search
                </button>
            </form>
            </div>
            <ArrowDown />
          </div>
        </div>
      </div>
    );
  }
}
