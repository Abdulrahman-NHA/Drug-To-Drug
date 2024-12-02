import React from "react";

const SafeCard = (props) => {
  return <div className="card green">{props.children}</div>;
};

export default SafeCard;
