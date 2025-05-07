import { useState, useEffect } from 'react';
import Wheel from './Wheel';
import InputForm from './InputForm';
import Winners from './Winners';
import '../styles/Container.css';


const INITIAL_SEGMENTS = [
  { color: '#FF6B6B', text: 'Segment 1'},
  { color: '#4ECDC4', text: 'Segment 2'}
];

const AppContainer = () => {
  const [segments, setSegments] = useState(() => {
    const savedSegments = localStorage.getItem('wheelSegments');
    return savedSegments ? JSON.parse(savedSegments) : INITIAL_SEGMENTS;
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('wheelSegments', JSON.stringify(segments));
  }, [segments]);

  const addWinner = (segment) => {
    const winners = JSON.parse(localStorage.getItem('wheelWinners') || '[]');
    const newWinner = {
      segment,
      timestamp: new Date().toLocaleString()
    };
    localStorage.setItem('wheelWinners', JSON.stringify([...winners, newWinner]));
    window.dispatchEvent(new Event('winnerAdded'));
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Spin the Wheel</h1>
      <div className="content-container">
        {!isMobile && <Winners />}
        <Wheel segments={segments} onWin={addWinner} />
        <InputForm segments={segments} setSegments={setSegments} />
      </div>
    </div>
    
  );
};

export default AppContainer;