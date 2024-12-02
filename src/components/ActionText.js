import React from "react";

const ActionText = (props) => {
  return <span className="action-text">{props.text ?? "Delete"}</span>;
};

export default ActionText;
