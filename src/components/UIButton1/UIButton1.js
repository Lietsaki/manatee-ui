import React from 'react';
import { string, object, func } from 'prop-types';
import styled from 'styled-components';
import { getHSLA, getHSLADarker, getBeforeDimensions } from '@bit/lietsaki.manatee-ui.manatee-utilities';

const defaultColor = { hue: '211', saturation: '3', lightness: '60', alpha: '1' };
const defaultGradientColor1 = '#659999';
const defaultGradientColor2 = '#f4791f';

const UIButton1 = styled.button`
  color: ${(props) => (props.textColor ? props.textColor : '#fff')};
  background-color: ${(props) => (props.bgColor ? getHSLA(props.bgColor) : getHSLA(defaultColor))};
  width: ${(props) => (props.width ? props.width : '120px')};
  height: ${(props) => (props.height ? props.height : '37px')};
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  border: none;
  font-size: 15px;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.bgColor ? getHSLADarker(props.bgColor) : getHSLADarker(defaultColor))};
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

const GetUIButton1 = (props) => {
  const { onClick, bgColor, textColor, width, height, beforeGradient1, beforeGradient2 } = props;

  // Trigger event by pressing the enter key.
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  };

  return (
    <UIButton1
      onClick={onClick}
      onKeyPress={handleKeypress}
      bgColor={bgColor}
      textColor={textColor}
      width={width}
      height={height}
      beforeGradient1={beforeGradient1}
      beforeGradient2={beforeGradient2}
    >
      {props.children}
    </UIButton1>
  );
};

GetUIButton1.defaultProps = {
  bgColor: defaultColor,
  beforeGradient1: defaultGradientColor1,
  beforeGradient2: defaultGradientColor2,
  textColor: '#fff',
  width: '120px',
  height: '37px'
};

GetUIButton1.propTypes = {
  onClick: func,
  bgColor: object,
  textColor: string,
  width: string,
  height: string,
  beforeGradient1: string,
  beforeGradient2: string
};

export default GetUIButton1;
