// src/components/SkeletonCard.js

import React from 'react';
import '../App.css';

const SkeletonCard = () => {
  return (
    <div className="card">
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
};

export default SkeletonCard;
