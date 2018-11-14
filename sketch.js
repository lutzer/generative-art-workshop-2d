const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  // dimensions: [ 512, 512 ]
  dimensions: "A4",
  orientation: 'portrait',
  pixelsPerInch: 300,
  units: 'cm'
};

const sketch = ({ width, height }) => {
  const palette = random.pick(palettes);
  const background = palette.shift();
  const aspectRatio = width / height;

  const createGrid = (count = 100) => {
    const points = [];
    const frequency = random.range(0.1,2);
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = count <= 1 ? 0.5 : x / (count - 1);
        let v = count <= 1 ? 0.5 : y / (count -1);

        const offset = random.insideCircle(0.1);
        u += offset[0];
        v += offset[1];

        const noise = random.noise2D(u * aspectRatio * frequency, v * frequency);

        points.push({
          color: random.pick(palette),
          radius: Math.abs(2 + noise * 5),
          rotation: noise * Math.PI * .5,
          alpha: noise + 1 * 0.5,
          position: [u, v]
        });
      }
    }
    return points;
  }

  const grid = createGrid().filter( () => random.chance(0.3));

  return ({ context, width, height }) => {
    const minDim = Math.min(width,height);

    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = "hsl(0,0%,95%)";
    context.fillRect(0, 0, width, height);

    const margin = 0.2 * width;
    grid.forEach( ({ position, color, radius, rotation, alpha }) => {
      [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = 'black'
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font= `${radius}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.globalCompositeOperation = 'multiply';
      context.globalAlpha = 0.1;
      context.fillText('\u2396', 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
