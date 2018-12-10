import React from 'react';

const businessName = busName => (
  <div className="nameBus" key={1}>
    {busName.name}
  </div>
);

export const BusinessName = (props) => (
  props.busName.map(ans => businessName(ans))
);

// export default function BusinessName(props) {
//   return(
//     <div>
//       {props.name}
//     </div>
//   );
// }
