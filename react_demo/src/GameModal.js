import React, { useState, useEffect } from 'react';
import './GameModal.css';

const GameModal = ({ screenshots, summary, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to remove HTML tags from summary
  const cleanSummary = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  // Function to update the index and reset the animation
  const updateIndex = (newIndex) => {
    const screenshotElement = document.querySelector('.modal-screenshot');
    screenshotElement.style.animation = 'none'; // Reset animation
    setTimeout(() => { // Re-apply the animation
      setCurrentImageIndex(newIndex);
      screenshotElement.style.animation = '';
    }, 10); // Timeout to allow animation reset
  };

  const showPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 0;
    updateIndex(newIndex);
  };

  const showNext = () => {
    const newIndex = currentImageIndex < screenshots.length - 1 ? currentImageIndex + 1 : screenshots.length - 1;
    updateIndex(newIndex);
  };

  

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="image-slider">
          <button className="slide-btn left" onClick={showPrevious}>&lt;</button>
          <img
            src={screenshots[currentImageIndex].image}
            alt={`Screenshot ${currentImageIndex + 1}`}
            className="modal-screenshot"
          />
          <button className="slide-btn right" onClick={showNext}>&gt;</button>
        </div>
        <p className="game-summary">{cleanSummary(summary)}</p>
      </div>
    </div>
  );
};

export default GameModal;
