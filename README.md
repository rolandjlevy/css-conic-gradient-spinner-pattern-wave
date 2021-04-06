# Wave-pool Simulator 🌊

This is a CSS animation experiment which started with just one spinning Conic Gradient circle and developed from getting more and more ideas, trying to make the wave pattern engaging and interesting to play with.

### Links 🔗

+ [Play live demo](https://css-conic-gradient-wave-pattern.rolandjlevy.repl.co/)
+ [See source code](https://replit.com/@RolandJLevy/css-conic-gradient-wave-pattern)
+ [Explore Github repo](https://github.com/rolandjlevy/css-conic-gradient-wave-pattern)

![Wave](https://raw.githubusercontent.com/rolandjlevy/css-conic-gradient-wave-pattern/master/images/wave.png)

### How it works ⚙️
- The wave pattern is made up of 100 spinning circles
- Each circle uses a conic-gradient background to make a 4-quartered circle
- With each 360 degree rotation the opacity transitions from 0 to 1
- The varied animation delay creates the wave effect
- The animation can be paused and randomised
- The overall speed, colour, corners and shape are controlled by the sliders using the `setProperty` method 

### Using the setProperty method 
The [setProperty method](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty) uses the value from each slider to set the property of the CSS style declaration object. For example, if the value of speed is 0.5 seconds the `--speed` property in the CSS is set like this:

`document.documentElement.style.setProperty('--speed', '0.5s')`

### Conic Gradients
Each spinning circle has a background which is a conic gradient made up of 4 quarter. The [conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient()) CSS function creates an image consisting of a gradient with color transitions rotated around a center point (rather than radiating from the center).

Here is an example of a conic gradient:
```css
background: conic-gradient( 
  black 0deg 90deg, 
  green 90deg 180deg, 
  black 180deg 270deg,
  turquoise 270deg
);
```