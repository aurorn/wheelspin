// Swipe.jsx
import { useState, useRef } from 'react';

const useSwipe = (onSwipe, isSpinning, isMobile) => {
  const touchStartRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    if (isSpinning) return;
    e.preventDefault();
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || isSpinning) return;
    e.preventDefault();

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };

    handleSwipeEnd(touchEnd);
  };

  const handleMouseDown = (e) => {
    if (isSpinning || !isMobile) return;
    setIsDragging(true);
    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !touchStartRef.current || !isMobile) return;
    
    const touchEnd = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };

    handleSwipeEnd(touchEnd);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      touchStartRef.current = null;
    }
  };

  const handleSwipeEnd = (touchEnd) => {
    const dx = touchEnd.x - touchStartRef.current.x;
    const dy = touchEnd.y - touchStartRef.current.y;
    const duration = touchEnd.time - touchStartRef.current.time;
    
    const velocity = Math.sqrt(dx * dx + dy * dy) / duration;
    
    if (Math.abs(dx) > Math.abs(dy) && velocity > 0.5) {
      const direction = dx > 0 ? 1 : -1;
      onSwipe(direction);
    }

    touchStartRef.current = null;
  };

  return {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    isDragging
  };
};

export default useSwipe;