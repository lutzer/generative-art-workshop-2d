const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: "A4",
  units: "cm",
  pixelsPerInch: 300
};

const margin = 2; 

const sketch = () => {

  function drawCircle(context, position, radius) {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(position[0], position[1], radius, 0, Math.PI * 2);
    context.fill();
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i=0; i < 20; i++) {
      drawCircle(context, [width/2, height/2], 0.2);
    }
  };
};

canvasSketch(sketch, settings);
