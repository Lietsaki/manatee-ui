const getHSLA = (color) => `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`;
const getHSLADarker = (color) => `hsla(${color.hue}, ${color.saturation}%, ${color.lightness - 10}%, ${color.alpha})`;

// This function takes a css height/width value and adds more of it. It is used to get the width/height of a :before
// pseudo-element belonging to rectangular buttons.
// It can receive px, rem, vw and vh values.
const getBeforeDimensions = (dimension, value) => {
  // ERROR HANDLING
  if (dimension !== 'height' && dimension !== 'width') {
    throw Error(`The dimension argument must be a string equal to 'height' or 'width'.`);
  }
  if (!value.endsWith('px') && !value.endsWith('rem') && !value.endsWith('vw') && !value.endsWith('vh')) {
    throw Error(`Your value must be a string ending in px, rem, vw or vh. For example: '120px'.`);
  }

  // 1) Define the differences of size between the button and its :before pseudo-element
  const widthDifferences = {
    px: 20,
    rem: 2,
    vw: 2
  };
  const heightDifferences = {
    px: 13,
    rem: 1.3,
    vh: 2
  };

  // 2) Determine which dimensions we'll be using
  const usingDifferences = dimension === 'height' ? heightDifferences : widthDifferences;

  // 3) Get an array with the value, like this ['1', '2', '0', 'p', 'x']
  const valueArr = value.split('');

  if (value.endsWith('px')) {
    // 4) Remove the last two items ('p', 'x') so we end up with an array that only contains numbers
    valueArr.splice(valueArr.length - 2);

    // 5) Return the joined array plus the extra value and the unit.
    // We multiply by 1 to turn the string into a number and be able to sum.
    return valueArr.join('') * 1 + usingDifferences.px + 'px';
  }

  if (value.endsWith('rem')) {
    valueArr.splice(valueArr.length - 3);
    return valueArr.join('') * 1 + usingDifferences.rem + 'rem';
  }

  // The extra value we add for vw and vh is the same (2), so we can use only one if statement in this case.
  // We can take advantage of the fact that strings behave like arrays to concatenate the unit.
  if (value.endsWith('vw') || value.endsWith('vh')) {
    valueArr.splice(valueArr.length - 2);
    return valueArr.join('') * 1 + 2 + value[value.length - 2] + value[value.length - 1];
  }
};

export { getHSLA, getHSLADarker, getBeforeDimensions };
