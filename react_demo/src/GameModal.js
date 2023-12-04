import React from 'react';
import './GameModal.css'; // Ensure you have CSS for styling

const GameModal = ({ screenshots, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="image-gallery">
          {screenshots.map((screenshot, index) => (
            <img key={index} src={screenshot.image} alt={`Screenshot ${index + 1}`} />
          ))}
        </div>
        <button className="close-modal" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default GameModal;