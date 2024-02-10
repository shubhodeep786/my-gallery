import React from 'react';
import './modal.css'; // You'll need to create this CSS file for styling

const Modal = ({ isOpen, src, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="Zoomed" />
        <button onClick={onClose} className="close-modal">X</button>
      </div>
    </div>
  );
};

export default Modal;
