// src/components/Skeleton.js

import React from 'react';
import '../App.css';

const Skeleton = () => {
  return (
    <div className="card">
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
};

export default Skeleton;
