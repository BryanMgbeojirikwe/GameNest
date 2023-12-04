import React from "react";
import "./GameCard.css";

const GameCard = ({ name, rating, released, background_image }) => {
  const ratingClass = rating < 2.5 ? 'below' : rating >= 2.5 && rating <= 4 ? 'mid' : 'above';
  const defaultImage = "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV0ZmxpeHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"; // Default image URL

  return (
    <div className="card">
      <div className="poster">
        <img src={background_image || defaultImage} alt={`Cover of ${name}`} />
      </div>
      <div className="info">
        <p className="title">{name}</p>
        <p className={`vote ${ratingClass}`}>
          {rating}
        </p>
        <p className="release-date">Released: {released}</p>
      </div>
    </div>
  );
};

export default GameCard;
