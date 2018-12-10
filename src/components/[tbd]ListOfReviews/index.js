import React from 'react';

import './index.css';

const oneReview = review => (
  <div key={review.review}>
    <p>{review.review}</p>
  </div>
);

export const ListOfReviews = (props) => (
  props.review.map(item => oneReview(item))
);




// export default class Review extends Component {
//   render() {
//     return(
//       <div>
//         <nav className="reviewNav" role="navigation">
//           <a href="/">
//             <img src={LogoWhite} alt="logo" className="logoImg imgHeader" />
//           </a>
//           Caffeinated
//         </nav>
//
//         <Footer />
//       </div>
//     );
//   }
// }
