import { SimpleImage } from './simple-image';

export class SimplePixel {
  public get red(): number {
    return this.image.getRed(this.x, this.y);
  }

  public set red(value: number) {
    this.image.setRed(this.x, this.y, value);
  }

  public get green(): number {
    return this.image.getGreen(this.x, this.y);
  }

  public set green(value: number) {
    this.image.setGreen(this.x, this.y, value);
  }

  public get blue(): number {
    return this.image.getBlue(this.x, this.y);
  }

  public set blue(value: number) {
    this.image.setBlue(this.x, this.y, value);
  }

  public get alpha(): number {
    return this.image.getAlpha(this.x, this.y);
  }

  public set alpha(value: number) {
    this.image.setAlpha(this.x, this.y, value);
  }

  constructor(private readonly image: SimpleImage, private x: number, private y: number) {}

  public setAllFrom(pixel: SimplePixel): void {
    this.red = pixel.red;
    this.green = pixel.green;
    this.blue = pixel.blue;
    this.alpha = pixel.alpha;
  }
}
