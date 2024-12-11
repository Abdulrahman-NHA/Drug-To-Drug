// src/components/Header.js

import React from 'react';
import TitleText from './TitleText';
import '../App.css';

const Header = () => {
  return (
    <header className="header">
      <TitleText text="InteractMeds" />
    </header>
  );
};

export default Header;
