const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: [ 2048, 2048 ]
  dimensions: "postcard",
  orientation: "landscape",
  pixelsPerInch: 300,
  units: 'cm'
};

const sketch = () => {
  return ({ context, width, height }) => {
    const minDim = Math.min(width,height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, minDim * 0.2, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.strokeStyle = "gray";
    context.lineWidth = 0.2;
    context.stroke();
  };
};

canvasSketch(sketch, settings);
