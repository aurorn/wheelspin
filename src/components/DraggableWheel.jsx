import React, { useEffect, useRef, useState } from 'react';

const DraggableWheel = ({ children, style, className }) => {
  const objectRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastAngleRef = useRef(0);

  useEffect(() => {
    const element = objectRef.current;
    if (!element) return;

    const calculateAngle = (x, y) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      angle = angle < 0 ? angle + 360 : angle;

      let delta = angle - (lastAngleRef.current % 360);
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      const newRotation = rotation + delta;
      lastAngleRef.current = angle;
      
      return newRotation;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        setRotation(calculateAngle(e.clientX, e.clientY));
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        setRotation(calculateAngle(touch.clientX, touch.clientY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, rotation]);

  const defaultStyles = {
    display: 'inline-block',
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'center',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div 
      ref={objectRef} 
      style={{ ...defaultStyles, ...style }}
      className={className}
      onMouseDown={handleMouseDown}
      onTouchStart={() => setIsDragging(true)}
    >
      {children}
    </div>
  );
};

export default DraggableWheel;