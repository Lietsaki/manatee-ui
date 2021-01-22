import React from 'react';
import CatButton from './CatButton';

// To test all our customization options, let's create a button using every possible prop.
const garfieldOrange = { hue: '22', saturation: '84', lightness: '52', alpha: '1' };
const logMeow = () => console.log('Meow! You clicked the cat button.');

const CatButtonTest = () => {
  return (
    <>
      <CatButton>Log In</CatButton>
      <CatButton
        onClick={logMeow}
        bgColor={garfieldOrange}
        textColor="#151515"
        width="15vw"
        height="5vh"
        beforeGradient1="#FDC830"
        beforeGradient2="#F37335"
        rightEarStyles={{ right: '15px' }}
        leftEarStyles={{ left: '15px' }}
      >
        <p>Add to cart</p>
      </CatButton>
    </>
  );
};

export default CatButtonTest;
