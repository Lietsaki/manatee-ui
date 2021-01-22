import { getBeforeDimensions, getHSLA, getHSLADarker } from './ManateeUtilities';

const hslObject = { hue: '211', saturation: '3', lightness: '60', alpha: '1' };

test('Gets correct :before dimensions', () => {
  const pxValue = '120px';
  const remValue = '15rem';
  const vhValue = '5vh';
  const vwValue = '5vw';

  expect(getBeforeDimensions('height', pxValue)).toBe('133px');
  expect(getBeforeDimensions('width', pxValue)).toBe('140px');

  expect(getBeforeDimensions('height', remValue)).toBe('16.3rem');
  expect(getBeforeDimensions('width', remValue)).toBe('17rem');

  expect(getBeforeDimensions('height', vhValue)).toBe('7vh');
  expect(getBeforeDimensions('width', vwValue)).toBe('7vw');
});

test('Builds correct hsl value from object', () => {
  const hslObject = { hue: '211', saturation: '3', lightness: '60', alpha: '1' };
  expect(getHSLA(hslObject)).toBe('hsla(211, 3%, 60%, 1)');
});

test('Darkens the provided hsl object', () => {
  expect(getHSLADarker(hslObject)).toBe('hsla(211, 3%, 50%, 1)');
});
