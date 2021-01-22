import React from 'react';
import UIButton1 from './UIButton1';

// To test all our customization options, let's create a button using every possible prop.
const dangerRed = { hue: '349', saturation: '79', lightness: '50', alpha: '1' };
const logClick = () => console.log('I have been clicked!');

const UIButton1Test = () => {
  return (
    <>
      <UIButton1>
        <p>Cancel</p>
      </UIButton1>
      <UIButton1
        onClick={logClick}
        bgColor={dangerRed}
        textColor="#151515"
        width="15vw"
        height="5vh"
        beforeGradient1="#FF416C"
        beforeGradient2="#FF4B2B"
      >
        <p>Sign In</p>
      </UIButton1>
    </>
  );
};

export default UIButton1Test;
