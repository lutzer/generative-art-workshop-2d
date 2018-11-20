const canvasSketch = require('canvas-sketch');
const { vec2 } = require('gl-matrix');
const random = require('canvas-sketch-util/random');
const  { lerp, mapRange } = require('canvas-sketch-util/math');

random.setSeed(random.getRandomSeed());

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
  scaleToView: true
};

const frequency = random.range(0.5,1.5);

const sketch = () => {

  const createCircle = (numberOfPoints = 4) => {
    let points = [];
    for (let i=0; i <= numberOfPoints; i++) {
      points.push([ 
        Math.cos(i / numberOfPoints * Math.PI * 2), 
        Math.sin(i / numberOfPoints * Math.PI * 2)
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

    const smallRadius = 80;
    const bigRadius = 180;
    const numberOfCircles = 12;

    
    for (let n=0; n<numberOfCircles; n++) { 
      const offset = [random.noise3D(0,n,time), random.noise3D(1,n,time)];
      // const circleResolution = mapRange(random.noise2D(n, time),-1,1,3,8);
      context.beginPath();
      const circle = createCircle(60);
      circle.forEach((point,i) => {
        const noise = random.noise4D(point[0] * frequency, point[1] * frequency, n * frequency, time);
        
        const mp = vec2.scaleAndAdd([], middlepoint, offset, 10);
        const randomRadius = noise * 7 + lerp(smallRadius, bigRadius, n/numberOfCircles);
        const p = vec2.scaleAndAdd([], mp, point, randomRadius);
        context.lineTo(p[0],p[1]);
      })
      context.strokeStyle = 'black';
      context.lineWidth = 40;
      context.globalAlpha = 0.15;
      context.closePath();
      context.stroke();
    } 
    
  };
};

canvasSketch(sketch, settings);
