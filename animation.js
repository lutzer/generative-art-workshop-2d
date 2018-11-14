const canvasSketch = require('canvas-sketch');
const  { mapRange } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const { vec2 } = require('gl-matrix');
const  { lerp } = require('canvas-sketch-util/math');
const eases = require('eases');
const bezierEasing = require('bezier-easing'); // get curve from http://cubic-bezier.com/

const settings = {
  animate: true,
  dimensions: [ 512, 512 ],
  duration: 10,
  fps: 24
};

const sketch = () => {

  const createGrid = (count = 15) => {
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
  const ease = bezierEasing(1,.36,.27,.92);

  return ({ context, width, height, time, playhead }) => {
    // const v = mapRange(Math.sin(time), -1, 1, 0, 1);
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const margin = 0.1 * width;
    grid.forEach( (point) => {
      [u, v] = point;
      
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // const radius = Math.max(0, random.noise3D(u, v, time)) * 50;
      const frequency = 0.5;
      const noise1 = loopNoise(u * frequency, v * frequency, ease(playhead), 2, 0)
      const noise2 = loopNoise(u * frequency, v * frequency, ease(playhead), 2, 100)

      const angle = noise1 * Math.PI * 2
      const normal = [ Math.cos(angle), Math.sin(angle) ];
      const radius = noise2 * 20;

      // console.log([noise, noise2]);

      const a = vec2.scaleAndAdd([],[x, y], normal, radius);
      const b = vec2.scaleAndAdd([],[x, y], normal, -radius);

      context.beginPath();
      [a, b].forEach( (p) => {
        context.lineTo(p[0],p[1]);
      });
      context.strokeStyle = 'black'
      context.lineWidth = 2;
      // context.globalAlpha = Math.abs(noise) * 0.9 + 0.1;
      context.stroke();


    });
  };
};

function loopNoise (x, y, t, scale = 1, w) {
  const duration = scale;
  const current = t * scale;
  return ((duration - current) * random.noise4D(x, y, current,w) + current * random.noise4D(x, y, current - duration, w)) / duration;
}

canvasSketch(sketch, settings);
