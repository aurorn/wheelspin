# Spin the Wheel

This was a Project I created after needing a random choice generator for my Stream, but I decided to make it a "Spin the Wheel" type application.

The spinWheel function divides 360° by the amount of segments there are up to 10, then it chooses the the winning segment by using the Math.random method. 

The Spinning effect is achieved by using the Cubic Bezier transform in CSS over 5 seconds with a preset minimum of complete rotations.

There is also a randomOffset effect that makes the arrow land in various parts of the segment for a more authentic animation.

There's a past history of winners using local storage and a colour choice for the segments using  react-color.

Created using React and Vite.