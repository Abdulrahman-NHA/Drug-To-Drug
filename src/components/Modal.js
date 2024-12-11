// src/components/Modal.js

import React from 'react';
import '../App.css';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
