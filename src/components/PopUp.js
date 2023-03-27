import React from "react";

function PopUp({ props }) {
  return (
    <div>
      <h6>{props.companyName}</h6>
      <h6>{props.head}</h6>
      <h6>{props.Address}</h6>
      <h6>{props.state}</h6>
    </div>
  );
}

export default PopUp;
