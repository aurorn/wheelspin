import { useState, useEffect } from 'react';
import useSwipe from './Swipe';
import '../styles/Wheel.css';
import RotatingObject from './DraggableWheel';

const SPIN_DURATION = 5000;
const MIN_ROTATIONS = 5;

const Wheel = ({ segments, onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const spinWheel = (direction = 1) => {
    if (segments.length === 0) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    if (segments.length === 1) {
      setWinner(segments[0].text);
      onWin(segments[0].text);
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    
    const segmentSize = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const extraSpins = MIN_ROTATIONS * 360;
    const randomOffset = Math.random() * segmentSize;
    const newRotation = totalRotation + (direction * (extraSpins + (randomSegment * segmentSize) + randomOffset + 360));

    setTotalRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = Math.abs(newRotation % 360);
      const winningIndex = segments.length - 1 - Math.floor(normalizedRotation / segmentSize);
      const actualIndex = winningIndex % segments.length;
      const winningSegment = segments[actualIndex].text;
      setWinner(winningSegment);
      onWin(winningSegment);
    }, SPIN_DURATION);
  };

  const handleClick = () => {
    if (!isMobile) {
      spinWheel();
    }
  };

  const {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave
  } = useSwipe(spinWheel, isSpinning, isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createSegmentStyle = (index, totalSegments) => {
    const degree = 360 / totalSegments;
    const startAngle = degree * index;
    
    return {
      background: `conic-gradient(from ${startAngle}deg, ${segments[index].color} 0deg, ${segments[index].color} ${degree}deg, transparent ${degree}deg)`
    };
  };

  return (
    <div className="wheel-container">
      {showWarning && (
        <div className="warning-popup">
          Add at least one segment to spin the wheel.
        </div>
      )}
      <div className="winner-title">
        {winner && `Winner: ${winner}`}
      </div>
      <div style={{ position: 'relative' }}>
        <div className="arrow"></div>
        <RotatingObject>
          <div 
            className={`wheel ${isSpinning ? 'wheel-spinning' : ''}`}
            onClick={handleClick}
            onTouchStart={isMobile ? handleTouchStart : null}
            onTouchEnd={isMobile ? handleTouchEnd : null}
            onMouseDown={isMobile ? handleMouseDown : null}
            onMouseUp={isMobile ? handleMouseUp : null}
            onMouseLeave={isMobile ? handleMouseLeave : null}
            style={{ transform: `rotate(${totalRotation}deg)` }}
          >
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="segment"
                style={createSegmentStyle(index, segments.length)}
              />
            ))}
          </div>
        </RotatingObject>
      </div>
      <div className="spin-instructions">
        {isMobile ? 'Swipe to spin' : 'Click to spin'}
      </div>
    </div>
  );
};

export default Wheel;