import { useState } from 'react';
import '../styles/Wheel.css';

const SPIN_DURATION = 5000;
const MIN_ROTATIONS = 5;

const Wheel = ({ segments, onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const createSegmentStyle = (index, totalSegments) => {
    const degree = 360 / totalSegments;
    const startAngle = degree * index;
    
    return {
      background: `conic-gradient(from ${startAngle}deg, ${segments[index].color} 0deg, ${segments[index].color} ${degree}deg, transparent ${degree}deg)`
    };
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    const segmentSize = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const extraSpins = MIN_ROTATIONS * 360;
    const randomOffset = Math.random() * segmentSize;
    const newRotation = totalRotation + extraSpins + (randomSegment * segmentSize) + randomOffset + 360;

    setTotalRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = newRotation % 360;
      const winningIndex = segments.length - 1 - Math.floor(normalizedRotation / segmentSize);
      const actualIndex = winningIndex % segments.length;
      const winningSegment = segments[actualIndex].text;
      setWinner(winningSegment);
      onWin(winningSegment);
    }, SPIN_DURATION);
  };

  return (
    <div className="wheel-container">
      <div className="winner-title">
        {winner && `Winner: ${winner}`}
      </div>
      <div style={{ position: 'relative' }}>
        <div className="arrow"></div>
        <div 
          className={`wheel ${isSpinning ? 'wheel-spinning' : ''}`}
          onClick={spinWheel}
          style={{ transform: `rotate(${totalRotation}deg)` }}
        >
          {segments.map((segment, index) => {            
            return (
              <div 
                key={index}
                className="segment"
                style={createSegmentStyle(index, segments.length)}
              />
            );
          })}
        </div>
      </div>
      <div className="spin-instructions">
        Click to spin
      </div>
    </div>
  );
};

export default Wheel;