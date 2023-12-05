import React, { useState } from 'react';
import './GameModal.css';

const GameModal = ({ screenshots, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showPrevious = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : 0);
  };

  const showNext = () => {
    setCurrentImageIndex(prev => prev < screenshots.length - 1 ? prev + 1 : screenshots.length - 1);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {screenshots.length > 0 && (
          <div className="image-slider">
            <button className="slide-btn left" onClick={showPrevious}>&lt;</button>
            <img
              src={screenshots[currentImageIndex].image}
              alt={`Screenshot ${currentImageIndex + 1}`}
              className="modal-screenshot"
            />
            <button className="slide-btn right" onClick={showNext}>&gt;</button>
          </div>
        )}
        <button className="close-modal" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default GameModal;
