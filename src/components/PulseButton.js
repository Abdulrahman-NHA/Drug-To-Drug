// src/components/PulseButton.js

import React from 'react';
import '../App.css';

const PulseButton = ({ onClick, children }) => {
  return (
    <button className="interaction-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default PulseButton;
