const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 512, 512 ]
};

const sketch = () => {

  const createGrid = (count = 5) => {
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

  const grid = createGrid();
  console.log(grid);


  return ({ context, width, height }) => {
    const minDim = Math.min(width,height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    grid.forEach(point => {
      [u, v] = point;
      [x, y] = [u * width, v * height];

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2)
      context.lineWidth = 5;
      context.strokeStyle = 'black';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
