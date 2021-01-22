import React from 'react';
import { string, object, func } from 'prop-types';
import styled from 'styled-components';
import { getHSLA, getHSLADarker, getBeforeDimensions } from '@bit/lietsaki.manatee-ui.manatee-utilities';

const defaultColor = { hue: '270', saturation: '43', lightness: '52', alpha: '1' };
const defaultGradientColor1 = '#654ea3';
const defaultGradientColor2 = '#eaafc8';

// 1) Define the button body
const ButtonBody = styled.button`
  color: ${(props) => (props.textColor ? props.textColor : '#fff')};
  background-color: ${(props) => (props.bgColor ? getHSLA(props.bgColor) : getHSLA(defaultColor))};
  width: ${(props) => (props.width ? props.width : '120px')};
  height: ${(props) => (props.height ? props.height : '39px')};
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  border: none;
  font-size: 15px;
  outline: none;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.bgColor ? getHSLADarker(props.bgColor) : getHSLADarker(defaultColor))};

    svg {
      fill: ${(props) => (props.bgColor ? getHSLADarker(props.bgColor) : getHSLADarker(defaultColor))};
    }
  }

  &:active {
    transition: all 0.1s ease-in-out;
    transform: scale(0.97);
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    z-index: -20;
    width: ${(props) =>
      props.width ? getBeforeDimensions('width', props.width) : getBeforeDimensions('width', '120px')};
    height: ${(props) =>
      props.height ? getBeforeDimensions('height', props.height) : getBeforeDimensions('height', '37px')};
    border-radius: 2rem;
    transition: box-shadow 0.2s;
    will-change: box-shadow;
  }

  &:active:before,
  &:focus:before {
    box-shadow: -0.09375rem -0.09375rem 0 0.09375rem ${(props) => (props.beforeGradient1 ? props.beforeGradient1 : defaultGradientColor1)},
      0 0 0 0.1875rem ${(props) => (props.beforeGradient2 ? props.beforeGradient2 : defaultGradientColor2)};
  }
`;

// 2) Define the svg element with its attributes and styles
const Ear = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 1080 1080'
})`
  fill: ${(props) => (props.bgColor ? getHSLA(props.bgColor) : getHSLA(defaultColor))};
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: -1;
  bottom: 55%;
  transition: all 0.3s ease-in-out;
`;

// 3) Define the path element - When we want to store some JSX in a variable, we do it in a function that returns such
// JSX, just like this. If we try do simply store the JSX block directly without using a function, an error will be thrown.
const EarPath = () => (
  <path
    d="M1053.4,868.4c51.1-98.9-38.9-242.6-156.5-430.3C779,249.7,660.6,60.7,505.8,66.5
c-141.5,5.2-240,170.4-371.6,391.2C43.6,609.5-1.7,685.4,16.7,751.1C89.3,1009.6,934.5,1098.7,1053.4,868.4z"
  />
);

// 4) Attach the path as a child of the SVG to create the full ear.
const FullEar = (props) => (
  <Ear style={props.style} bgColor={props.bgColor}>
    <EarPath />
  </Ear>
);

// 5) Example of styles used to position each ear (each svg element)
const rightEarStyles = {
  right: '15px',
  bottom: '55%'
};
const leftEarStyles = {
  left: '15px',
  bottom: '55%'
};

const getCatButton = (props) => {
  const {
    onClick,
    bgColor,
    textColor,
    width,
    height,
    beforeGradient1,
    beforeGradient2,
    rightEarStyles,
    leftEarStyles
  } = props;

  // Trigger event by pressing the enter key.
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  };

  return (
    <ButtonBody
      onClick={onClick}
      onKeyPress={handleKeypress}
      bgColor={bgColor}
      textColor={textColor}
      width={width}
      height={height}
      beforeGradient1={beforeGradient1}
      beforeGradient2={beforeGradient2}
    >
      <FullEar style={rightEarStyles} bgColor={bgColor} />
      <FullEar style={leftEarStyles} bgColor={bgColor} />
      {props.children}
    </ButtonBody>
  );
};

getCatButton.defaultProps = {
  rightEarStyles,
  leftEarStyles,
  bgColor: defaultColor,
  beforeGradient1: defaultGradientColor1,
  beforeGradient2: defaultGradientColor2,
  textColor: '#fff',
  width: '120px',
  height: '39px'
};

getCatButton.propTypes = {
  onClick: func,
  bgColor: object,
  textColor: string,
  width: string,
  height: string,
  beforeGradient1: string,
  beforeGradient2: string,
  leftEarStyles: object,
  rightEarStyles: object
};

export default getCatButton;
