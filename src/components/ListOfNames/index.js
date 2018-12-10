import React from 'react';

const oneName = nameList => (
  <div className="nameBus" key={business.id}>
    {busName.name}
  </div>
);

export const ListOfNames = (props) => (
  props.nameList.map(item => oneName(item))
);

// export default function BusinessName(props) {
//   return(
//     <div>
//       {props.name}
//     </div>
//   );
// }
