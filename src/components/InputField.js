import React from "react";

const InputField = ({ text }) => {
  return <input className="input" placeholder={text || "Search for drugs"} />;
};

export default InputField;
