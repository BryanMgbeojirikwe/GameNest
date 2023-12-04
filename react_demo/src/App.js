import React, { useState, useEffect } from "react";
import "./App.css";
import GameCard from "./GameCard";
import GameModal from "./GameModal"; // Make sure you have this component for displaying screenshots

function App() {
  const API_KEY = "27fffb70989a4131a61a960c34e3cd46";
  const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  const API_SEARCH = `https://api.rawg.io/api/games?key=${API_KEY}&search=`;

  const [games, setGames] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedGameScreenshots, setSelectedGameScreenshots] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGames(data.results));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term === "") {
      window.location.reload();
    } else {
      fetch(API_SEARCH + term)
        .then((res) => res.json())
        .then((data) => {
          setGames(data.results);
          setTerm("");
        });
    }
  };

  const onImageClick = (game) => {
    const screenshotsUrl = `https://api.rawg.io/api/games/${game.id}/screenshots?key=${API_KEY}`;
    
    fetch(screenshotsUrl)
      .then(res => res.json())
      .then(data => {
        setSelectedGameScreenshots(data.results); // Update state with fetched screenshots
      })
      .catch(error => console.error('Error fetching screenshots:', error));
  };

  return (
    <div className="App">
      <div className="search_nav">
        <div className="title">
          <h1 onClick={() => window.location.reload()}>GameNest</h1>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for games"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="games">
        {games.map(game => (
          <GameCard key={game.id} game={game} onImageClick={onImageClick} />
        ))}
      </div>

      {selectedGameScreenshots.length > 0 && (
        <GameModal
          screenshots={selectedGameScreenshots}
          closeModal={() => setSelectedGameScreenshots([])}
        />
      )}
    </div>
  );
}

export default App;
