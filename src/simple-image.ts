import { isNullOrUndefined, isNumber, isString } from '@qntm-code/utils';
import { makeImage, makeImageFromFile, makeImageFromSize } from './make-image';
import { SimplePixel } from './simple-pixel';

export class SimpleImage {
  /**
   * The width of the image
   */
  public get width(): number {
    return this.canvas.width;
  }

  /**
   * The height of the image
   */
  public get height(): number {
    return this.canvas.height;
  }

  /**
   * A promise that resolves once the image has loaded and is ready
   */
  public readonly ready = new Promise(resolve => (this.resolve = resolve as never));

  /**
   * Gets all the pixels in the images
   */
  public get pixels(): SimplePixel[] {
    const array = new Array<SimplePixel>();

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        array.push(new SimplePixel(this, x, y));
      }
    }

    return array;
  }

  /**
   * Internal reference to the ready resolve function
   */
  private resolve: () => void;

  private _canvas?: HTMLCanvasElement;

  private get canvas(): HTMLCanvasElement {
    if (!isNullOrUndefined(this._canvas)) {
      return this._canvas;
    }

    throw new Error(`Cannot to get canvas before it was set`);
  }

  private get context(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d')!;
  }

  private imageData?: ImageData;

  constructor(sourceOrWidth: number | HTMLImageElement | string | File | SimpleImage | HTMLCanvasElement, height?: number) {
    if (
      sourceOrWidth instanceof HTMLImageElement ||
      sourceOrWidth instanceof File ||
      sourceOrWidth instanceof SimpleImage ||
      sourceOrWidth instanceof HTMLCanvasElement ||
      isString(sourceOrWidth) ||
      isNumber(sourceOrWidth)
    ) {
      if (isNumber(sourceOrWidth)) {
        if (sourceOrWidth <= 0) {
          throw new Error(`Width must be greater than 0`);
        }

        if (!isNumber(height)) {
          throw new Error(`Height must be provided`);
        } else if (height <= 0) {
          throw new Error(`Height must be greater than 0`);
        }
      }

      void this.initialise(sourceOrWidth, height);
    } else {
      throw new Error(`Unrecognized values used to create a SimpleImage`);
    }
  }

  public getRed(x: number, y: number): number {
    return this.imageData!.data[this.getIndex(x, y)];
  }

  public setRed(x: number, y: number, value: number): void {
    this.imageData!.data[this.getIndex(x, y)] = this.clamp(value);
  }

  public getGreen(x: number, y: number): number {
    return this.imageData!.data[this.getIndex(x, y) + 1];
  }

  public setGreen(x: number, y: number, value: number): void {
    this.imageData!.data[this.getIndex(x, y) + 1] = this.clamp(value);
  }

  public getBlue(x: number, y: number): number {
    return this.imageData!.data[this.getIndex(x, y) + 2];
  }

  public setBlue(x: number, y: number, value: number): void {
    this.imageData!.data[this.getIndex(x, y) + 2] = this.clamp(value);
  }

  public getAlpha(x: number, y: number): number {
    return this.imageData!.data[this.getIndex(x, y) + 3];
  }

  public setAlpha(x: number, y: number, value: number): void {
    this.imageData!.data[this.getIndex(x, y) + 3] = this.clamp(value);
  }

  public getPixel(x: number, y: number): SimplePixel {
    return new SimplePixel(this, x, y);
  }

  public setPixel(x: number, y: number, pixel: SimplePixel): void {
    this.setRed(x, y, pixel.red);
    this.setGreen(x, y, pixel.green);
    this.setBlue(x, y, pixel.blue);
    this.setAlpha(x, y, pixel.alpha);
  }

  public setSize(width: number, height: number): void {
    width = Math.floor(width);
    height = Math.floor(height);

    if (width > 0 && height > 0) {
      this.flush();

      const canvas = document.createElement('canvas');

      canvas.width = width;
      canvas.height = height;

      this.context.drawImage(this.canvas, 0, 0, width, height);

      this._canvas = canvas;
    } else {
      throw new Error(`Cannot set size to a width or height less than or equal to 0`);
    }
  }

  public draw(canvas: HTMLCanvasElement): void {
    this.flush();

    canvas.getContext('2d')!.drawImage(this.canvas, 0, 0, canvas.width, canvas.height);
  }

  public getDataURL(): string {
    this.flush();

    return this.canvas.toDataURL();
  }

  private async initialise(
    sourceOrWidth: number | HTMLImageElement | string | File | SimpleImage | HTMLCanvasElement,
    height?: number
  ): Promise<void> {
    let image: HTMLImageElement | undefined = undefined;

    if (sourceOrWidth instanceof HTMLImageElement) {
      image = sourceOrWidth;
    } else if (typeof sourceOrWidth === 'string') {
      image = await makeImage(sourceOrWidth);
    } else if (sourceOrWidth instanceof File) {
      image = await makeImageFromFile(sourceOrWidth);
    } else if (sourceOrWidth instanceof SimpleImage) {
      this._canvas = sourceOrWidth.canvas;
    } else if (sourceOrWidth instanceof HTMLCanvasElement) {
      this._canvas = sourceOrWidth;
    } else {
      image = await makeImageFromSize(sourceOrWidth, height!);
    }

    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
    }

    if (image) {
      this.canvas.width = 'naturalWidth' in image ? Math.max(image.naturalWidth, image.width) : (image as HTMLImageElement).width;
      this.canvas.height = 'naturalHeight' in image ? Math.max(image.naturalHeight, image.height) : (image as HTMLImageElement).height;

      this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }

    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    this.resolve();
  }

  private getIndex(x: number, y: number): number {
    return (Math.floor(x) + Math.floor(y) * this.width) * 4;
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(Math.floor(value), 255));
  }

  private flush(): void {
    this.context.putImageData(this.imageData!, 0, 0, 0, 0, this.imageData!.width, this.imageData!.height);
  }
}
