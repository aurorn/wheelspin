# Spin the Wheel

This was a Project I created after needing a random choice generator for my Stream, but I decided to make it a "Spin the Wheel" type application.

The spinWheel function divides 360° by the amount of segments there are up to 10, then it chooses the the winning segment by using the Math.random method. 

The Spinning effect is achieved by using the Cubic Bezier transform in CSS over 5 seconds with a preset minimum of complete rotations.

There is also a randomOffset effect that makes the arrow land in various parts of the segment for a more authentic animation.

There's a past history of winners using local storage and a colour choice for the segments using  react-color.

Created using React and Vite.

## Upcoming Features

### Roulette Wheel Enhancement
- Import custom roulette wheel SVG
- Implement alternating segment patterns (e.g., 1-2-1-2 or 1-2-3-1-2-3)
- Advanced segment distribution system

### Visual and Audio Effects
- Add sound effects for wheel spinning and winner announcement
- Winner celebration animations
- Zoom animation focusing on arrow during final spin moments
- Dynamic spin speed and rotation count

### Segment Management
- Display win percentage for each segment
- Save segment configurations as drafts
- Quick-load saved segment patterns

### Wheel Customization
- Multiple wheel design options
- Customizable wheel themes and styles
- Adjustable wheel size and appearance

### Mobile Optimization
- Swipe-to-spin functionality
- Touch-friendly interface
- Responsive design improvements

### Theme Support
- Toggle between dark and light modes
- Custom color schemes
- Consistent styling across themes

### Accessibility Improvements
- Enhanced keyboard navigation
- Screen reader compatibility
- Improved color contrast
- Better UI/UX experience

---
*Note: These features are planned for future implementation. Feel free to contribute or suggest additional features!*