const canvasSketch = require('canvas-sketch');
const { vec2 } = require('gl-matrix');
const random = require('canvas-sketch-util/random');

random.setSeed(random.getRandomSeed());

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  scaleToView: true
};

const sketch = () => {

  const createCircle = (radius = 1, numberOfPoints = 60) => {
    let points = [];
    for (let i=0; i <= numberOfPoints; i++) {
      points.push([ 
        Math.cos(i / numberOfPoints * Math.PI * 2) * radius, 
        Math.sin(i / numberOfPoints * Math.PI * 2) * radius
      ]);
    }
    return points;
  }

  return ({ context, width, height, time }) => {
    
    //clear screen
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = "hsl(0,0%,95%)";
    context.fillRect(0, 0, width, height);

    const middlepoint = [ width/2, height/2 ];

    const radius = 400
    const circle = createCircle();

    context.beginPath();
    circle.forEach((point,i) => {
      const noise = random.noise2D(i, time);

      const randomRadius = noise * 10 + radius;
      const p = vec2.scaleAndAdd([], middlepoint, point, randomRadius);
      context.lineTo(p[0],p[1]);
    })
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    // context.globalAlpha = Math.abs(noise) * 0.9 + 0.1;
    context.stroke();
  };
};

canvasSketch(sketch, settings);
