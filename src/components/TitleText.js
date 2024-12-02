import React from "react";

const TitleText = (props) => {
  return <div className="title-text">{props.text ?? "Default Title"}</div>;
};

export default TitleText;
