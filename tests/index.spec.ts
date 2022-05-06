import { SimpleImage, SimplePixel } from '../src';

const dummyImageString =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABNJREFUGFdjZGBg+M+ABhhpIAgAJ4wFAdoS1GgAAAAASUVORK5CYII=';
let dummyImage: HTMLImageElement;
let dummyCanvas: HTMLCanvasElement;

describe('SimpleImage', () => {
  beforeAll(async () => {
    dummyImage = new Image();
    dummyImage.src = dummyImageString;

    await new Promise(resolve => (dummyImage.onload = resolve));

    dummyCanvas = document.createElement('canvas');
    dummyCanvas.width = dummyImage.width;
    dummyCanvas.height = dummyImage.height;
    dummyCanvas.getContext('2d').drawImage(dummyImage, 0, 0, dummyImage.width, dummyImage.height);
  });

  describe('From size', () => {
    it('Should create an image', async () => {
      const size = 256;
      const simpleImage = new SimpleImage(size, size);

      expect(simpleImage).not.toBeNull();

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(size);
      expect(simpleImage.height).toEqual(size);
    });

    it('Should throw if no height provided', () => {
      const size = 256;

      expect(() => new SimpleImage(size)).toThrow();
    });

    it('Should throw if width is 0', () => {
      const size = 256;

      expect(() => new SimpleImage(0, size)).toThrow();
    });

    it('Should throw if height is 0', () => {
      const size = 256;

      expect(() => new SimpleImage(size, 0)).toThrow();
    });
  });

  describe('From string', () => {
    it('Should create an image', async () => {
      const simpleImage = new SimpleImage(dummyImageString);

      expect(simpleImage).not.toBeNull();

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(5);
      expect(simpleImage.height).toEqual(5);
    });
  });

  describe('From image', () => {
    it('Should create an image', async () => {
      const simpleImage = new SimpleImage(dummyImage);

      expect(simpleImage).not.toBeNull();

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(5);
      expect(simpleImage.height).toEqual(5);
    });
  });

  describe('From canvas', () => {
    it('Should create an image', async () => {
      const simpleImage = new SimpleImage(dummyCanvas);

      expect(simpleImage).not.toBeNull();

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(5);
      expect(simpleImage.height).toEqual(5);
    });
  });

  describe('From existing SimpleImage', () => {
    it('Should create an image', async () => {
      const simpleImage = new SimpleImage(new SimpleImage(dummyCanvas));

      expect(simpleImage).not.toBeNull();

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(5);
      expect(simpleImage.height).toEqual(5);
    });
  });

  describe('From file', () => {
    it('Should create an image', async () => {
      const blob = await new Promise(resolve => dummyCanvas.toBlob(resolve));

      const file = new File([blob as string], 'fileName.jpg', { type: 'image/jpeg' });

      const simpleImage = new SimpleImage(file);

      expect(simpleImage).not.toBeNull();

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(5);
      expect(simpleImage.height).toEqual(5);
    });
  });

  describe('Throw error', () => {
    it('Should throw an error if no source is provided', () => {
      expect(() => new SimpleImage(undefined)).toThrow();
    });
  });

  describe('width', () => {
    it('Should return the width', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      expect(simpleImage.width).toEqual(256);
    });

    it('Should throw if canvas not ready', () => {
      const simpleImage = new SimpleImage(256, 256);

      expect(() => simpleImage.width).toThrow();
    });
  });

  describe('height', () => {
    it('Should return the height', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      expect(simpleImage.height).toEqual(256);
    });

    it('Should throw if canvas not ready', () => {
      const simpleImage = new SimpleImage(256, 256);

      expect(() => simpleImage.height).toThrow();
    });
  });

  describe('pixels', () => {
    it('Should return an array of SimplePixels', async () => {
      const size = 256;
      const simpleImage = new SimpleImage(size, size);

      await simpleImage.ready;

      const pixels = simpleImage.pixels;

      expect(Array.isArray(pixels)).toBeTrue();
      expect(pixels.every(pixel => pixel instanceof SimplePixel)).toBeTrue();
      expect(pixels.length).toEqual(size * size);
    });
  });

  describe('Red', () => {
    it('Should get the red value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      expect(simpleImage.getRed(0, 0)).toEqual(0);
    });

    it('Should set the red value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setRed(1, 1, 255);

      expect(simpleImage.getRed(1, 1)).toEqual(255);
    });
  });

  describe('Green', () => {
    it('Should get the green value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      expect(simpleImage.getGreen(0, 0)).toEqual(0);
    });

    it('Should set the green value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setGreen(1, 1, 255);

      expect(simpleImage.getGreen(1, 1)).toEqual(255);
    });
  });

  describe('Blue', () => {
    it('Should get the blue value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      expect(simpleImage.getBlue(0, 0)).toEqual(0);
    });

    it('Should set the blue value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setBlue(1, 1, 255);

      expect(simpleImage.getBlue(1, 1)).toEqual(255);
    });
  });

  describe('Alpha', () => {
    it('Should get the alpha value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      expect(simpleImage.getAlpha(0, 0)).toEqual(255);
    });

    it('Should set the alpha value', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setAlpha(1, 1, 0);

      expect(simpleImage.getAlpha(1, 1)).toEqual(0);
    });
  });

  describe('pixel', () => {
    it('Should get the pixel at a given coordinate', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setRed(1, 1, 255);

      const pixel = simpleImage.getPixel(1, 1);

      expect(pixel).not.toBeNull();

      expect(pixel.red).toEqual(255);
    });

    it('Should set the pixel at a given coordinate', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      const pixel = simpleImage.getPixel(3, 3);

      pixel.red = 200;
      pixel.green = 201;
      pixel.blue = 202;
      pixel.alpha = 203;

      simpleImage.setPixel(1, 1, pixel);

      const updatedPixel = simpleImage.getPixel(1, 1);

      expect(updatedPixel.red).toEqual(200);
      expect(updatedPixel.green).toEqual(201);
      expect(updatedPixel.blue).toEqual(202);
      expect(updatedPixel.alpha).toEqual(203);
    });
  });

  describe('setSize', () => {
    it('Should set the size to the updated values', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setSize(300, 200);

      expect(simpleImage.width).toEqual(300);
      expect(simpleImage.height).toEqual(200);
    });

    it('Should throw an error if the size is less than or equal to 0', async () => {
      const simpleImage = new SimpleImage(256, 256);

      await simpleImage.ready;

      simpleImage.setSize(300, 200);

      expect(() => simpleImage.setSize(0, 200)).toThrow();
      expect(() => simpleImage.setSize(200, 0)).toThrow();
    });
  });

  describe('draw', () => {
    it('Should update the provided canvas with the updated image', async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 5;
      canvas.height = 5;

      expect(canvas.toDataURL()).not.toEqual(dummyImageString);

      const simpleImage = new SimpleImage(dummyImageString);

      await simpleImage.ready;

      simpleImage.draw(canvas);

      expect(canvas.toDataURL()).toEqual(dummyImageString);
    });
  });

  describe('toDataURL', () => {
    it('Should draw the updated image', async () => {
      const simpleImage = new SimpleImage(dummyImageString);

      await simpleImage.ready;

      expect(simpleImage.toDataURL()).toEqual(dummyImageString);

      simpleImage.setRed(1, 1, 255);

      expect(simpleImage.toDataURL()).not.toEqual(dummyImageString);
    });
  });
});

describe('SimplePixel', () => {
  describe('setAllFrom', () => {
    it('Should set a pixels values to match that of another pixel', async () => {
      const simpleImage = new SimpleImage(dummyImageString);

      await simpleImage.ready;

      const pixelA = simpleImage.getPixel(0, 0);

      pixelA.red = 200;
      pixelA.green = 201;
      pixelA.blue = 202;
      pixelA.alpha = 203;

      const pixelB = simpleImage.getPixel(1, 1);

      expect(pixelA.red).not.toEqual(pixelB.red);
      expect(pixelA.green).not.toEqual(pixelB.green);
      expect(pixelA.blue).not.toEqual(pixelB.blue);
      expect(pixelA.alpha).not.toEqual(pixelB.alpha);

      pixelB.setAllFrom(pixelA);

      expect(pixelA.red).toEqual(pixelB.red);
      expect(pixelA.green).toEqual(pixelB.green);
      expect(pixelA.blue).toEqual(pixelB.blue);
      expect(pixelA.alpha).toEqual(pixelB.alpha);
    });
  });
});
