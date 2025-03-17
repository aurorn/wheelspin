import { useState, useEffect } from 'react';
import '../styles/Winners.css';

const Winners = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const loadWinners = () => {
      const savedWinners = localStorage.getItem('wheelWinners');
      const parsedWinners = savedWinners ? JSON.parse(savedWinners) : [];

      const sortedWinners = parsedWinners.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      setWinners(sortedWinners);
    };

    loadWinners();
    window.addEventListener('storage', loadWinners);
    window.addEventListener('winnerAdded', loadWinners);

    return () => {
      window.removeEventListener('storage', loadWinners);
      window.removeEventListener('winnerAdded', loadWinners);
    };
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('wheelWinners');
    setWinners([]);
    window.dispatchEvent(new Event('winnerAdded'));
  };

  return (
    <div className="winners-container">
      <h3 className="winners-title">Winner History</h3>
      <div className="winners-history">
        {winners.length === 0 ? (
          <p className="no-winners">No winners yet</p>
        ) : (
          winners.map((winner, index) => (
            <div key={index} className="history-item">
              <div className="history-item-text">{winner.segment}</div>
              <small className="history-item-time">{winner.timestamp}</small>
            </div>
          ))
        )}
      </div>
      {winners.length > 0 && (
        <button onClick={clearHistory} className="clear-button">
          Clear History
        </button>
      )}
    </div>
  );
};

export default Winners;