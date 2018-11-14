const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [ 512, 512 ]
};

const sketch = () => {
  const palette = random.pick(palettes);
  const background = palette.shift();

  console.log(palette);

  const createGrid = (count = 50) => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count -1);

        const frequency = 1.2
        const noise = random.noise2D(u * frequency, v * frequency);

        points.push({
          color: random.pick(palette),
          radius: Math.abs(30 + noise * 100),
          rotation: noise * Math.PI * .3,
          position: [u, v]
        });
      }
    }
    return points;
  }

  const grid = createGrid().filter( () => random.chance(0.3));

  return ({ context, width, height }) => {
    const minDim = Math.min(width,height);
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    const margin = 0.2 * width;
    grid.forEach( ({ position, color, radius, rotation }) => {
      [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font= `${radius}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('.', 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
