import React, { useState } from 'react';
import './GameModal.css';

// Function to remove HTML tags from summary (moved outside the component)
const cleanSummary = (text) => {
  return text && text.replace(/<\/?[^>]+(>|$)/g, "");
};

const GameModal = ({ screenshots, summary, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showPrevious = () => {
    setCurrentImageIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
  };

  const showNext = () => {
    setCurrentImageIndex(prevIndex => prevIndex < screenshots.length - 1 ? prevIndex + 1 : screenshots.length - 1);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="image-slider">
          {currentImageIndex > 0 && (
            <button className="slide-btn left" onClick={showPrevious}>&lt;</button>
          )}
          <img
            src={screenshots[currentImageIndex].image}
            alt={`Screenshot ${currentImageIndex + 1}`}
            className="modal-screenshot"
            loading="lazy" // Use lazy loading to improve performance
          />
          {currentImageIndex < screenshots.length - 1 && (
            <button className="slide-btn right" onClick={showNext}>&gt;</button>
          )}
        </div>
        <p className="game-summary">{cleanSummary(summary)}</p>
      </div>
    </div>
  );
};

export default GameModal;
