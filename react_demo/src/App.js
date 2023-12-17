import React, { useState, useEffect, useCallback, Suspense } from 'react';
import debounce from 'lodash.debounce'; // Ensure lodash.debounce is installed
import './App.css';

const GameCard = React.lazy(() => import('./GameCard'));
const GameModal = React.lazy(() => import('./GameModal'));

function App() {
  const API_KEY = '27fffb70989a4131a61a960c34e3cd46';
  const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  const [games, setGames] = useState([]);
  const [term, setTerm] = useState('');
  const [selectedGameScreenshots, setSelectedGameScreenshots] = useState([]);
  const [gameSummary, setGameSummary] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      });
  }, []);

  const debouncedSearch = useCallback(debounce((nextValue) => {
    fetch(`${API_URL}&search=${nextValue}`)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      });
  }, 500), []);

  const handleSearch = (e) => {
    e.preventDefault();
    debouncedSearch(term);
    setTerm('');
  };

  const onImageClick = (gameId) => {
    const screenshotsUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`;
    const gameDetailsUrl = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;

    fetch(screenshotsUrl)
      .then(res => res.json())
      .then(data => {
        setSelectedGameScreenshots(data.results);
      })
      .catch(error => console.error('Error fetching screenshots:', error));

    fetch(gameDetailsUrl)
      .then(res => res.json())
      .then(data => {
        setGameSummary(data.description_raw); 
      })
      .catch(error => console.error('Error fetching game details:', error));

    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setSelectedGameScreenshots([]);
    setGameSummary('');
  };

  const fetchGamesByGenre = (genreId) => {
    const genreUrl = `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}`;
    fetch(genreUrl)
      .then(res => res.json())
      .then(data => {
        setGames(data.results);
      });
  };

  return (
    <div className="App">
      <div className="search_nav">
        <div className="title">
          <h1 onClick={() => window.location.reload()}>GameNest</h1>
        </div>
        <div className="genre_buttons">
          <button onClick={() => fetchGamesByGenre(4)}>Action</button>
          <button onClick={() => fetchGamesByGenre(3)}>Adventure</button>
          <button onClick={() => fetchGamesByGenre(5)}>RPG</button>
          <button onClick={() => fetchGamesByGenre(7)}>Puzzle</button>
          <button onClick={() => fetchGamesByGenre(1)}>Racing</button>
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
        <Suspense fallback={<div>Loading...</div>}>
          {games.map(game => (
            <GameCard key={game.id} game={game} onImageClick={() => onImageClick(game.id)} />
          ))}
        </Suspense>
      </div>

      {selectedGameScreenshots.length > 0 && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <GameModal
            screenshots={selectedGameScreenshots}
            summary={gameSummary}
            closeModal={closeModal}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
