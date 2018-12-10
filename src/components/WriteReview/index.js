import React from 'react';

import { ReviewResults } from '../../components/ReviewResults';
import { ListOfNames } from '../../components/ListOfNames';
import LogoWhite from '../../images/LogoWhite.png';
import Footer from '../../components/Footer';

import Search from '../../components/Search';
// import Home from '../../components/Home';

import './index.css';

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      busName: [],
      reviewSubmitted: false
    };
    this.submitPostReview = this.submitPostReview.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {


    fetch("http://localhost:8080/api/reviews")
      .then(response => response.json())
      .then(data => {
        this.setState({
            reviewList: data
        });
      })
      .catch(error => {
        console.log("could not GET reviews", error)
      });
  }

  nameResults() {
    return <ListOfNames busName = {this.state.busName}/>
  }

  handleInputSubmission(event) {
    const reviewPost = event.target.value
  }

  submitPostReview(e) {
    e.preventDefault();

    this.setState({
      reviewSubmitted: true,
      reviewList: this.reviewPost
    });

    fetch("http://localhost:8080/api/reviews", {
      method: 'POST',
      body: JSON.stringify({review: this.state.reviewList}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    const { reviewList, reviewSubmitted } = this.state;
    return (
      <div id="writeReview">
      <nav className="reviewNav" role="navigation">
        <a href="/">
          <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
        </a>
        Caffeinated
      </nav>

      <h3 className="busName">
        { this.nameResults() }
      </h3>

      <form className="reviewForm" onSubmit={this.submitPostReview}>

        <div className="review">
          <textarea className="postField"
            placeholder="Your review will be helpful for others looking for other great local coffee, tea, and bubble tea shops!"
            id="postReview"
            onChange={this.handleInputSubmission.bind(this)}
            >
          </textarea>
        </div>

        <button className="postButton" type="submit">Post Review</button>
        <div className="push"></div>

      </form>

      <div>
        <ul>
          {reviewList.map((item, i) => (
            <p id="reviewList" key={i}>
              {item.review}
            </p>
          ))}
        </ul>
      </div>

      <Footer />

      </div>
      );
    }

}




// if(reviewSubmitted) {
//
//   return (
//     <div id="writeReview">
//
//       <nav className="reviewNav" role="navigation">
//         <a href="/">
//           <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
//         </a>
//         Caffeinated
//       </nav>
//
//       <h3 className="busName">Shop Name Here</h3>
//
//       <form className="reviewForm" onSubmit={this.submitPostReview}>
//         <div className="review">
//           <textarea className="postField"
//             placeholder="Your review will be helpful for others looking for other great local coffee, tea, and bubble tea shops!"
//             id="postReview"
//             onChange={this.handleInputSubmission.bind(this)}
//             >
//           </textarea>
//         </div>
//
//         <button className="postButton" type="submit">Post Review</button>
//         <div className="push"></div>
//       </form>
//
//       <Footer />
//
//     </div>
//
//   );
// }
//
// else {
//   return (
//
//     <div id="writeReview">
//       <nav className="reviewNav" role="navigation">
//         <a href="/">
//           <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
//         </a>
//         Caffeinated
//       </nav>
//
//       <h3 className="busName">Shop Name Here</h3>
//
//       <form className="reviewForm" onSubmit={this.submitPostReview}>
//         <div className="review">
//           <textarea className="postField"
//             placeholder="Your review will be helpful for others looking for other great local coffee, tea, and bubble tea shops!"
//             id="postReview"
//             onChange={this.handleInputSubmission.bind(this)}
//             >
//           </textarea>
//         </div>
//
//         <button className="postButton" type="submit">Post Review</button>
//         <div className="push"></div>
//       </form>
//
//       <ul>
//        <div>
//         {reviewList.map((item, i) => (
//           <p id="reviewList" key={i}>
//             {item.review}
//           </p>
//         ))}
//         </div>
//       </ul>
//
//       <Footer />
//
//     </div>
//   );
// }




  //   if(!reviewSubmitted) {
  //     return
  //       <div id="writeReview">
  //         <nav className="reviewNav" role="navigation">
  //           <a href="/">
  //             <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
  //           </a>
  //           Caffeinated
  //         </nav>
  //
  //         <h3 className="busName">Shop Name Here</h3>
  //
  //         <form className="reviewForm" onSubmit={this.submitPostReview}>
  //           <div className="review">
  //             <textarea className="postField"
  //               placeholder="Your review will be helpful for others looking for other great local coffee, tea, and bubble tea shops!"
  //               id="postReview"
  //               onChange={this.handleInputSubmission.bind(this)}
  //               >
  //             </textarea>
  //           </div>
  //
  //           <button className="postButton" type="submit">Post Review</button>
  //           <div className="push"></div>
  //         </form>
  //
  //         <Footer />
  //
  //       </div>
  //   }
  //
  //   else {
  //     return (
  //         <div id="writeReview">
  //           <nav className="reviewNav" role="navigation">
  //             <a href="/">
  //               <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
  //             </a>
  //             Caffeinated
  //           </nav>
  //
  //           <h3 className="busName">Shop Name Here</h3>
  //
  //           <div>
  //             <ul>
  //               {reviewList.map(item => (
  //                 <p key={item.review}>
  //                   {item.review}
  //                 </p>
  //               ))}
  //             </ul>
  //           </div>
  //
  //           <Footer />
  //
  //         </div>
  //     );
  //   }
  // }}
