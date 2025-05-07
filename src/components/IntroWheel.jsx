import React from 'react';
import '../styles/Wheel.css';
import DraggableWheel from './DraggableWheel';

const IntroWheel = () => {
  const segments = [
    { color: '#FF6B6B' },
    { color: '#4ECDC4' },
    { color: '#45B7D1' },
    { color: '#96CEB4' },
    { color: '#FFEEAD' },
    { color: '#D4A5A5' },
    { color: '#9B59B6' },
    { color: '#3498DB' },
    { color: '#E67E22' },
    { color: '#2ECC71' }
  ];

  const createSegmentStyle = (index) => {
    const degree = 360 / segments.length;
    const startAngle = degree * index;
    
    return {
      background: `conic-gradient(from ${startAngle}deg, ${segments[index].color} 0deg, ${segments[index].color} ${degree}deg, transparent ${degree}deg)`
    };
  };

  return (
    <div className="wheel-container">
      <div style={{ position: 'relative' }}>
        <DraggableWheel><div 
          className="wheel spinning"
          style={{ animation: 'spin 10s linear infinite' }}
        >
          {segments.map((segment, index) => (
            <div 
              key={index}
              className="segment"
              style={createSegmentStyle(index)}
            />
          ))}
        </div>
        </DraggableWheel>
      </div>
    </div>
  );
};

export default IntroWheel;