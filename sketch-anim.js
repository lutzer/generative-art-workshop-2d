/**
 * @Author: Lutz Reiter [http://www.lu-re.de] <lutz>
 * @Date:   2018-11-17T17:03:37+01:00
 * @Last modified by:   lutz
 * @Last modified time: 2018-11-20T22:23:24+01:00
 */



const canvasSketch = require('canvas-sketch');
const  { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

random.setSeed(random.getRandomSeed());

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
  bleed: 1 / 8
};

const sketch = ({ width, height }) => {
  const palette = random.shuffle(random.pick(palettes));
  const background = palette.shift();
  const aspectRatio = width / height;

  const createGrid = (count = 30) => {
    const points = [];
    const frequency = random.range(0.1,2);
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = count <= 1 ? 0.5 : x / (count - 1);
        let v = count <= 1 ? 0.5 : y / (count -1);

        const noise = random.noise2D(u * aspectRatio * frequency, v * frequency);

        points.push({
          color: random.pick(palette),
          radius: Math.abs(80 + noise * 60),
          rotation: noise * Math.PI * .5,
          alpha: noise + 1 * 0.5,
          position: [u, v],
          offset: 0
        });
      }
    }
    return points;
  }

  const grid = createGrid().filter( () => random.chance(0.6));
  const speed = random.range(10,20)
  console.log("test");

  return ({ context, width, height, time }) => {
    const minDim = Math.min(width,height);

    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    const margin = 0.15 * width;
    grid.forEach( ({ position, color, radius, rotation, alpha, offset }, index) => {
      [u, v] = position;

      const noise = random.noise2D(index, time);


      offset += noise * speed;
      // console.log(offset);
      // u += offset[0];
      // v += offset[1];

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v) + offset;

      if (y > margin && y <= height - margin) {
          context.save();
          context.fillStyle = '#fff';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.font= `${radius}px "Arial"`;
          context.translate(x, y);
          context.rotate(rotation);
          //context.globalCompositeOperation = 'multiply';
          context.globalAlpha = noise > 0 ? 0.1 + noise : 0;
          context.fillText(':', 0, 0);
          context.restore();
      }


      if (y > height - margin)
        grid[index].offset = 0
      else
        grid[index].offset = offset;
    });
  };
};

canvasSketch(sketch, settings);
