// src/components/Text.js

import React from 'react';
import '../App.css';

const Text = ({ text, className }) => {
  return <p className={`text ${className}`}>{text}</p>;
};

export default Text;
