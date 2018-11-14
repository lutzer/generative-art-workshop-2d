const canvasSketch = require('canvas-sketch');
const  { mapRange } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  animate: true,
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = (count = 20) => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = count <= 1 ? 0.5 : x / (count - 1);
        let v = count <= 1 ? 0.5 : y / (count -1);
        points.push([u, v]);
      }
    }
    return points;
  }

  const grid = createGrid();

  return ({ context, width, height, time }) => {
    // const v = mapRange(Math.sin(time), -1, 1, 0, 1);
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    grid.forEach( (point) => {
      [u, v] = point;
      [x, y] = [u * width, v * height];

      const radius = Math.max(0, random.noise3D(u, v, time)) * 50;

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = "black";
      context.fill();


    });
  };
};

canvasSketch(sketch, settings);
