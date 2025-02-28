import { useState } from 'react';
import '../styles/Wheel.css';


const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const circle = {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: '#FF6B6B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    animation: isSpinning ? 'spin 2s linear infinite' : 'none',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    cursor: 'pointer'
  };

  return (
    <div 
      style={circle}
      onClick={() => setIsSpinning(!isSpinning)}
      >
      <span style={{color: 'white'}}>{isSpinning ? 'STOP' : 'SPIN'} </span>
    </div>
  );
};


export default Wheel;