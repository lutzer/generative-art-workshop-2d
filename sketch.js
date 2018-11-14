const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math')

const settings = {
  dimensions: [ 512, 512 ]
};

const sketch = () => {

  const createGrid = (count = 30) => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count -1);
        points.push([u, v]);
      }
    }
    return points;
  }

  const grid = createGrid().filter( () => Math.random() > 0.5);

  return ({ context, width, height }) => {
    const minDim = Math.min(width,height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const margin = 0.1 * width;
    grid.forEach(point => {
      [u, v] = point;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2)
      context.lineWidth = 2;
      context.strokeStyle = 'white';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
