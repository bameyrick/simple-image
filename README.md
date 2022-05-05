# SimpleImage

Simple image manipulation

[![GitHub release](https://img.shields.io/github/release/bameyrick/simple-image.svg)](https://github.com/bameyrick/simple-image/releases)
[![Build Status](https://travis-ci.com/bameyrick/simple-image.svg?branch=main)](https://travis-ci.com/github/bameyrick/simple-image)
[![codecov](https://codecov.io/gh/bameyrick/simple-image/branch/main/graph/badge.svg)](https://codecov.io/gh/bameyrick/simple-image)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/28fcdc3ff65e4c34b6e61188c599df91)](https://www.codacy.com/manual/bameyrick/simple-image)

- [SimpleImage](#simpleimage)
  - [Install](#install)
    - [npm](#npm)
    - [yarn](#yarn)
  - [Documentation](#documentation)
  - [Usage](#usage)
    - [Creating a SimpleImage](#creating-a-simpleimage)
      - [With dimensions](#with-dimensions)
      - [With an image element](#with-an-image-element)
      - [With a canvas element](#with-a-canvas-element)
      - [With a File](#with-a-file)
      - [With an existing SimpleImage instance](#with-an-existing-simpleimage-instance)
    - [Methods](#methods)
    - [Get](#get)
    - [Set](#set)
    - [getPixel](#getpixel)
    - [setPixel](#setpixel)
    - [getPixels](#getpixels)
    - [setSize](#setsize)
    - [draw](#draw)
    - [toDataUrl](#todataurl)
  - [SimplePixel](#simplepixel)
    - [Properties](#properties)
    - [Methods](#methods-1)
      - [setAllFrom](#setallfrom)

## Install

You can install via npm or yarn.

### npm

```bash
npm install --save simple-image
```

### yarn

```bash
yarn add simple-image
```

## Documentation

This documentation is written in TypeScript, however this library works fine in vanilla JavaScript too.

## Usage

### Creating a SimpleImage

A `SimpleImage` instance is created asynchronously (beacause we have to wait on image.onload internally), therefore you must await the `ready` promise.

#### With dimensions

```typescript
async function myFn(): void {
  const simpleImage = new SimpleImage(256, 256);

  await simpleImage.ready;

  // Do stuff
}

myFn();
```

or without async/await:

```typescript
const simpleImage = new SimpleImage(256, 256);

simpleImage.ready.then(() => {
  // Do stuff
});
```

#### With an image element

```typescript
async function myFn(): void {
  const image: HTMLImageElement = document.getElementById('my-image');

  const simpleImage = new SimpleImage(image);

  await simpleImage.ready;

  // Do stuff
}

myFn();
```

#### With a canvas element

```typescript
async function myFn(): void {
  const canvas: HTMLCanvasElement = document.getElementById('my-canvas');

  const simpleImage = new SimpleImage(canvas);

  await simpleImage.ready;

  // Do stuff
}

myFn();
```

#### With a File

```typescript
const input: HTMLInputElement = document.getElementById('my-input');

input.onchanges = () => {
  const simpleImage = new SimpleImage(input.files[0]);

  await simpleImage.ready;

  // Do stuff
};
```

#### With an existing SimpleImage instance

```typescript
async function myFn(): void {
  const simpleImage = new SimpleImage(256, 256);

  await simpleImage.ready;

  // Do stuff

  const newSimpleImage = new SimpleImage(simpleImage);

  await newSimpleImage.ready;

  // Do stuff
}

myFn();
```

### Methods

### Get

There are 4 methods to get a colour at a given position, `getRed`, `getGreen`, `getBlue`, `getAlpha`.

| Argument | Description                                              | Type   |
| -------- | -------------------------------------------------------- | ------ |
| x        | The x coordinate of the pixel you want to the colour for | number |
| y        | The y coordinate of the pixel you want to the colour for | number |

### Set

There are 4 methods to set a colour at a given position, `getRed`, `getGreen`, `getBlue`, `getAlpha`.

| Argument | Description                                                  | Type   |
| -------- | ------------------------------------------------------------ | ------ |
| x        | The x coordinate of the pixel you want to set the colour for | number |
| y        | The y coordinate of the pixel you want to set the colour for | number |
| value    | Value between 0 and 255 for the colour                       | number |

### getPixel

Gets a pixel at any given coordinate:

| Argument | Description                                   | Type   |
| -------- | --------------------------------------------- | ------ |
| x        | The x coordinate of the pixel you want to get | number |
| y        | The y coordinate of the pixel you want to get | number |

### setPixel

Sets a pixel at any given coordinate to match a given pixel:

| Argument | Description                                   | Type                          |
| -------- | --------------------------------------------- | ----------------------------- |
| x        | The x coordinate of the pixel you want to set | number                        |
| y        | The y coordinate of the pixel you want to set | number                        |
| pixel    | The pixel you want to match to                | [`SimplePixel`](#simplepixel) |

### getPixels

Returns an array of [`SimplePixel`](#simplepixel) of all the pixels in the image.

### setSize

Sets the size of the `SimpleImage` to the dimensions provided.

| Argument | Description                  | Type   |
| -------- | ---------------------------- | ------ |
| width    | The new width for the image  | number |
| height   | The new height for the image | number |

### draw

Draws the `SimpleImage` to the provided canvas.

| Argument | Description           | Type                |
| -------- | --------------------- | ------------------- |
| canvas   | The canvas to draw to | `HTMLCanvasElement` |

### toDataUrl

Returns a data url for the `SimpleImage`.

## SimplePixel

An instance of of a pixel within the `SimpleImage`.

### Properties

| Property | Description                                                       | Type   |
| -------- | ----------------------------------------------------------------- | ------ |
| red      | Gets/sets the red value for the pixel. Number between 0 and 255   | number |
| green    | Gets/sets the green value for the pixel. Number between 0 and 255 | number |
| blue     | Gets/sets the blue value for the pixel. Number between 0 and 255  | number |
| alpha    | Gets/sets the alpha value for the pixel. Number between 0 and 255 | number |

### Methods

#### setAllFrom

Sets all the colours to match those of a given [`SimplePixel`](#simplepixel)

| Argument | Description        | Type                          |
| -------- | ------------------ | ----------------------------- |
| pixel    | The pixel to match | [`SimplePixel`](#simplepixel) |
