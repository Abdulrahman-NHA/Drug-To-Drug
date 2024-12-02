import React from "react";

const Text = (props) => {
  return <div className="text">{props.text ?? "Default Text"}</div>;
};

export default Text;
