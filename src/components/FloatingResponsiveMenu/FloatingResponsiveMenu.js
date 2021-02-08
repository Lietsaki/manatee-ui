import React, { useState } from 'react';
import { array, object } from 'prop-types';
import styled from 'styled-components';

// 1) Define the floating menu element with static props
const Menu = styled.div.attrs((props) => ({
  expandedWidth: props.expandedWidth || '280px',
  expandedHeight: props.expandedHeight || '540px',
  contractedWidth: props.contractedWidth || '200px',
  contractedHeight: props.contractedHeight || '380px',
  mainColor: props.mainColor || '#333333',
  hoverColor: props.hoverColor || '#0071e3',
  itemBgHover: props.itemBgHover || 'rgba(66, 151, 236, 0.2)',
  menuBoxShadowColor: props.menuBoxShadowColor || 'rgba(30, 30, 30, 0.7)',
  fontFamily: props.fontFamily || 'sans-serif',
  notifBgColor: props.notifBgColor || '#F02849',
  notifTextColor: props.notifTextColor || '#ffffff'
}))`
  display: none;

  // Only show this element in sizes larger than mobile. Initially, it will be shown as a grid of icons.
  @media screen and (min-width: 1023px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    width: ${(props) => props.contractedWidth};
    height: ${(props) => props.contractedHeight};
    box-shadow: 7px 5px 35px -22px ${(props) => props.menuBoxShadowColor};
    border-radius: 30px;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    font-family: ${(props) => props.fontFamily};
    padding: 2%;

    // React router links are rendered as <a> tags, so style those as well
    div,
    a {
      span.notif {
        font-size: 13px;
        right: 6%;
        bottom: 64%;
      }
    }
  }

  // In sizes larger than 1280px, show an icon next to a descriptive span
  @media screen and (min-width: 1280px) {
    display: flex;
    align-items: flex-start;
    width: ${(props) => props.expandedWidth};
    height: ${(props) => props.expandedHeight};
    padding: 0 0 2% 0;

    div,
    a {
      transition: background-color 0.1s ease-in-out;

      span.notif {
        left: 4%;
        bottom: 48%;
      }
    }
  }

  // Set each transitioned property individually instead of using 'all' to prevent
  // the elements from jumping when appearing or disappearing.
  div,
  a,
  svg,
  span {
    transition: background-color 0.1s ease-in-out, fill 0.2s ease-in-out, color 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  // This div repesents all items inside the floating menu,
  // for example, a home button with a house SVG icon.
  div,
  a {
    outline: none;
    border-radius: 10rem;
    width: 45%;
    height: 45%;
    padding: 10%;
    margin: 0;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;

    svg {
      height: 60%;
      width: 60%;
      fill: ${(props) => props.mainColor};
    }

    span {
      display: none;
    }

    @media screen and (min-width: 1280px) {
      height: 30px;
      margin-left: 10%;
      width: max-content;

      padding: 10px 30px 10px 15px;

      svg {
        height: 28px;
        width: 28px;
      }

      span.descriptive-text {
        display: inline-block;
        margin: 2px 0px 0px 20px;
        font-size: 18px;
        color: ${(props) => props.mainColor};
        font-weight: 600;
      }
    }

    // Styles to apply when the items are hovered
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.itemBgHover};

      svg {
        fill: ${(props) => props.hoverColor};
      }

      span.descriptive-text {
        color: ${(props) => props.hoverColor};
      }
    }

    // When the items are clicked, reduce their size a little bit
    &:active {
      transform: scale(0.95);
    }

    // When an item has the .active-item class, give them the hover color.
    &.active-item {
      span.descriptive-text {
        color: ${(props) => props.hoverColor};
      }

      svg {
        fill: ${(props) => props.hoverColor};
      }
    }

    // Use box shadow to create an outline that is rounded and blends with the bg color when focused
    &:focus {
      box-shadow: 0px 0px 0px 2px ${(props) => props.itemBgHover};
    }
  }

  span.notif {
    background-color: ${(props) => props.notifBgColor};
    color: ${(props) => props.notifTextColor};
    font-size: 14px;
    display: block;
    border-radius: 10rem;
    position: absolute;
    padding: 5px;
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span.large {
    width: 14px;
    height: 14px;
  }
`;

// 2) Define the footer element
const MobileFooter = styled.div.attrs((props) => ({
  mobileIconsColor: props.mobileIconsColor || '#878a8c',
  mobileActiveColor: props.mobileActiveColor || '#0071e3',
  mobileFontFamily: props.mobileFontFamily || 'sans-serif',
  mobileNotifBgColor: props.mobileNotifBgColor || '#F02849',
  mobileNotifTextColor: props.mobileNotifTextColor || '#ffffff'
}))`
  // Hide the element in non-mobile sizes
  @media screen and (min-width: 1023px) {
    display: none;
  }

  width: 100vw;
  font-family: ${(props) => props.mobileFontFamily};
  height: 7vh;
  background-color: #fff;
  border-top: 1px solid rgba(232, 230, 230, 0.9);
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 9999;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  // React router links are rendered as <a> tags, so style those as well
  div,
  a {
    outline: none;
    border-radius: 10rem;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    svg {
      fill: ${(props) => props.mobileIconsColor};
      width: 50%;
      height: 50%;
    }

    &:active {
      transform: scale(0.9);
    }

    &.active-item {
      svg {
        fill: ${(props) => props.mobileActiveColor};
      }
    }
  }

  span.notif {
    background-color: ${(props) => props.mobileNotifBgColor};
    color: ${(props) => props.mobileNotifTextColor};
    font-size: 10px;
    display: block;
    border-radius: 10rem;
    position: relative;
    bottom: 5px;
    right: 10px;
    padding: 2.5px;
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span.large {
    width: 14px;
    height: 14px;
  }
`;

const GetMenu = (props) => {
  const {
    optionsList,
    mobileNavbarItemsNumber,
    expandedWidth,
    expandedHeight,
    contractedWidth,
    contractedHeight,
    mainColor,
    hoverColor,
    menuBoxShadowColor,
    itemBgHover,
    fontFamily,
    notifBgColor,
    notifTextColor,
    mobileIconsColor,
    mobileActiveColor,
    mobileFontFamily,
    mobileNotifBgColor,
    mobileNotifTextColor
  } = props;

  const [activeItem, setActiveItem] = useState(0);
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      // Do something
    }
  };

  // 1) props.optionsList must be an array of arrays, with this structure:
  // [
  //   ['Home', '<svg> ... </svg>', 3] 'Button name' ---> 'SVG icon' ---> (if any) notifications in this button
  //   . . .
  // ]

  // 2) props.mobileNavbarItemsNumber will be an object whose values are numbers
  // (the key name is irrelevant) representing the index of the items in
  // optionsList that you want to display in the mobile navbar (ideally, up to 5).
  // This way we avoid nested loops and we can have our numbers in any order, not just ascending.
  const reducedOptionsList = [];
  for (const key in mobileNavbarItemsNumber) {
    reducedOptionsList.push(optionsList[mobileNavbarItemsNumber[key]]);
  }

  // 3) Define the full options list. It'll be a div with an svg and a descriptive span.
  const fullOptionsList = optionsList.map((option, index) => (
    <div
      className={activeItem === index ? 'active-item' : ''}
      onClick={() => setActiveItem(index)}
      tabIndex={index}
      key={index}
      onKeyPress={handleKeypress}
    >
      {option[1]}
      <span className="descriptive-text">{option[0]}</span>
      {/* Conditionally render the notification bubble if the option array has a third
      element, which would be the  number of notifications for that item */}
      {option[2] && typeof option[2] === 'number' && (
        <span className={option[2] > 9 ? 'notif large' : 'notif'}>{option[2]}</span>
      )}
    </div>
  ));

  // 4) Define the contracted options list. It'll simply be a div containing an svg.
  const contractedOptionsList = reducedOptionsList.map((option, index) => (
    <div className={activeItem === index ? 'active-item' : ''} onClick={() => setActiveItem(index)} key={index}>
      {option[1]}
      {option[2] && typeof option[2] === 'number' && (
        <span className={option[2] > 9 ? 'notif large' : 'notif'}>{option[2]}</span>
      )}
    </div>
  ));

  return (
    <div>
      <Menu
        expandedWidth={expandedWidth}
        expandedHeight={expandedHeight}
        contractedWidth={contractedWidth}
        contractedHeight={contractedHeight}
        mainColor={mainColor}
        menuBoxShadowColor={menuBoxShadowColor}
        hoverColor={hoverColor}
        itemBgHover={itemBgHover}
        fontFamily={fontFamily}
        notifBgColor={notifBgColor}
        notifTextColor={notifTextColor}
      >
        {fullOptionsList}
      </Menu>
      <MobileFooter
        mobileIconsColor={mobileIconsColor}
        mobileActiveColor={mobileActiveColor}
        mobileFontFamily={mobileFontFamily}
        mobileNotifBgColor={mobileNotifBgColor}
        mobileNotifTextColor={mobileNotifTextColor}
      >
        {contractedOptionsList}
      </MobileFooter>
    </div>
  );
};

GetMenu.defaultProps = {
  optionsList: [
    [
      `Home`,
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
        <path d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0" />
      </svg>
    ],
    [
      `Shopping Cart`,
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 456.029 456.029">
        <g>
          <g>
            <path
              d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
			c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
			C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
			c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
			C457.728,97.71,450.56,86.958,439.296,84.91z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
			c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
            />
          </g>
        </g>
      </svg>
    ],
    [
      `Notifications`,
      <svg
        id="Layer_4"
        enableBackground="new 0 0 24 24"
        height="512"
        viewBox="0 0 24 24"
        width="512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m21.379 16.913c-1.512-1.278-2.379-3.146-2.379-5.125v-2.788c0-3.519-2.614-6.432-6-6.92v-1.08c0-.553-.448-1-1-1s-1 .447-1 1v1.08c-3.387.488-6 3.401-6 6.92v2.788c0 1.979-.867 3.847-2.388 5.133-.389.333-.612.817-.612 1.329 0 .965.785 1.75 1.75 1.75h16.5c.965 0 1.75-.785 1.75-1.75 0-.512-.223-.996-.621-1.337z" />
          <path d="m12 24c1.811 0 3.326-1.291 3.674-3h-7.348c.348 1.709 1.863 3 3.674 3z" />
        </g>
      </svg>,
      12
    ],
    [
      `Today's Deals`,
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
        <g>
          <g>
            <path
              d="M446.906,299.769c-5.865-76.359-41.417-124.21-72.781-166.436C345.083,94.241,320,60.483,320,10.685
			c0-4-2.24-7.656-5.792-9.489c-3.563-1.844-7.844-1.542-11.083,0.812c-47.104,33.706-86.406,90.515-100.135,144.719
			c-9.531,37.737-10.792,80.161-10.969,108.18c-43.5-9.291-53.354-74.359-53.458-75.068c-0.49-3.375-2.552-6.312-5.552-7.916
			c-3.031-1.583-6.594-1.698-9.667-0.177c-2.281,1.104-55.99,28.394-59.115,137.355C64.01,312.726,64,316.362,64,319.997
			c0,105.857,86.135,191.987,192,191.987c0.146,0.01,0.302,0.031,0.427,0c0.042,0,0.083,0,0.135,0
			C362.167,511.681,448,425.667,448,319.997C448,314.674,446.906,299.769,446.906,299.769z M256,490.652
			c-35.292,0-64-30.581-64-68.172c0-1.281-0.01-2.573,0.083-4.156c0.427-15.853,3.438-26.675,6.74-33.873
			c6.188,13.291,17.25,25.509,35.219,25.509c5.896,0,10.667-4.771,10.667-10.666c0-15.186,0.313-32.706,4.094-48.518
			c3.365-14.02,11.406-28.936,21.594-40.893c4.531,15.52,13.365,28.081,21.99,40.341c12.344,17.54,25.104,35.675,27.344,66.6
			c0.135,1.833,0.271,3.677,0.271,5.656C320,460.07,291.292,490.652,256,490.652z"
            />
          </g>
        </g>
      </svg>
    ],
    [
      `Explore`,
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="510px"
        height="510px"
        viewBox="0 0 510 510"
      >
        <g>
          <g id="explore">
            <path
              d="M255,226.95c-15.3,0-28.05,12.75-28.05,28.05s12.75,28.05,28.05,28.05s28.05-12.75,28.05-28.05S270.3,226.95,255,226.95z
			 M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M311.1,311.1L102,408l96.9-209.1L408,102
			L311.1,311.1z"
            />
          </g>
        </g>
      </svg>
    ],
    [
      `My orders`,
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 484.373 484.373">
        <g>
          <g>
            <path
              d="M473.61,119.808c0-0.512,0-0.512,0-1.024c-0.512-1.024-0.512-2.048-1.024-3.072V115.2
			c-0.512-1.024-1.536-2.048-2.048-2.56l-0.512-0.512c-0.512-0.512-1.536-1.024-2.048-1.536l-0.512-0.512h-0.512l-0.512-0.512
			L248.842,1.536c-4.096-2.048-9.216-2.048-13.824,0l-73.216,36.352l218.624,112.128l0.512,0.512c0.512,0,0.512,0.512,1.024,0.512
			c0.512,0.512,0.512,1.024,1.024,1.536c0,0.512,0,0.512,0,1.024v0.512v118.784c0,2.048-1.024,3.584-2.56,4.608l-44.032,23.04
			c-2.56,1.536-5.632,0.512-7.168-2.048c-0.512-0.512-0.512-1.536-0.512-2.56V179.712L107.53,65.536l-0.512-0.512l-88.576,44.032
			l-0.512,0.512h-0.512l-0.512,0.512c-0.512,0.512-1.536,1.024-2.048,1.536l-0.512,0.512c-1.024,1.024-1.536,2.048-2.56,3.072v0.512
			c-0.512,1.024-1.024,2.048-1.024,3.072c0,0.512,0,0.512,0,1.024c0,1.024-0.512,1.536-0.512,2.56v0.512v238.592
			c0,5.632,3.072,11.264,8.704,13.824l215.552,107.52c3.072,1.536,6.656,2.048,10.24,1.024l1.024-0.512
			c1.024,0,1.536-0.512,2.56-1.024l217.088-107.52c5.12-2.56,8.704-7.68,8.704-13.824V122.88v-0.512
			C473.61,121.344,473.61,120.832,473.61,119.808z"
            />
          </g>
        </g>
      </svg>
    ],
    [
      `Wishlist`,
      <svg height="512pt" viewBox="-50 0 511 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
        <path d="m365.964844 0h-320.464844c-24.8125 0-45 20.1875-45 45v422c0 24.8125 20.1875 45 45 45h320.46875c24.8125 0 45-20.1875 45-45v-422c-.003906-24.8125-20.191406-45-45.003906-45zm-52.699219 350h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15zm15 61c0 8.285156-6.714844 15-15 15h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15zm-174.8125-257.753906c-.222656-.238282-.4375-.480469-.644531-.730469-5.261719-6.371094-13.210938-16-13.207032-29.65625 0-22.367187 18.199219-40.570313 40.566407-40.570313 9.398437 0 18.367187 3.316407 25.472656 9.039063 7.761719-6.34375 17.773437-9.6875 28.296875-9.015625 21.082031 1.347656 37.742188 18.980469 37.929688 40.144531.121093 13.617188-7.0625 23.328125-13.449219 30.296875-.117188.132813-.238281.265625-.363281.398438l-41.398438 44.015625c-2.835938 3.015625-6.789062 4.722656-10.921875 4.722656-.003906 0-.003906 0-.003906 0-4.136719 0-8.085938-1.707031-10.921875-4.714844zm159.8125 120.753906h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15zm-200.609375 85.460938c-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938s-10.949219 24.460938-24.460938 24.460938zm24.460938 51.539062c0 13.507812-10.949219 24.460938-24.460938 24.460938-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938zm-24.460938-127.539062c-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938s-10.949219 24.460938-24.460938 24.460938zm0 0" />
      </svg>
    ],
    [
      `Support`,
      <svg height="512pt" viewBox="0 -26 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
        <path d="m422.257812 0h-331.445312c-50.074219 0-90.8125 40.644531-90.8125 90.609375v338.863281c0 12.003906 7.28125 22.964844 18.558594 27.921875 3.984375 1.753907 8.207031 2.605469 12.394531 2.605469 7.503906 0 14.898437-2.738281 20.628906-7.949219 41.546875-37.589843 95.320313-58.292969 151.421875-58.292969h.015625l219.296875.015626c49.449219 0 89.683594-40.320313 89.683594-89.878907v-214.355469c0-49.371093-40.257812-89.539062-89.742188-89.539062zm-273.394531 261.519531c0 8.28125-6.714843 14.996094-15 14.996094-8.28125 0-15-6.714844-15-14.996094v-43.507812h-27.015625v43.507812c0 8.28125-6.71875 14.996094-15 14.996094-8.285156 0-15-6.714844-15-14.996094v-117.015625c0-8.285156 6.714844-15 15-15 8.28125 0 15 6.71875 15 15v43.507813h27.015625v-43.507813c0-8.285156 6.71875-15 15-15 8.285157 0 15 6.71875 15 15zm90.207031-73.507812c8.285157 0 15 6.714843 15 15 0 8.285156-6.714843 15-15 15h-42.015624v25.421875c0 1.703125 1.382812 3.085937 3.082031 3.085937h38.933593c8.285157 0 15 6.714844 15 14.996094 0 8.285156-6.714843 15-15 15h-38.933593c-18.242188 0-33.082031-14.839844-33.082031-33.082031v-80.847656c0-18.242188 14.839843-33.082032 33.082031-33.082032h38.933593c8.285157 0 15 6.714844 15 14.996094 0 8.285156-6.714843 15-15 15h-38.933593c-1.699219 0-3.082031 1.382812-3.082031 3.082031v25.425781h42.015624zm95.210938 88.503906h-27.132812c-19.238282 0-34.886719-15.648437-34.886719-34.882813v-97.128906c0-8.285156 6.714843-15 15-15 8.285156 0 15 6.714844 15 15v97.128906c0 2.691407 2.191406 4.886719 4.886719 4.886719h27.132812c8.28125 0 15 6.714844 15 14.996094 0 8.285156-6.71875 15-15 15zm71.695312-59.996094h-13.507812v45c0 8.28125-6.714844 14.996094-15 14.996094s-15-6.714844-15-14.996094v-110.441406c0-11.898437 9.679688-21.574219 21.574219-21.574219h21.933593c23.992188 0 43.511719 19.519532 43.511719 43.507813 0 23.992187-19.519531 43.507812-43.511719 43.507812zm0 0" />
        <path d="m405.976562 159.503906h-13.507812v27.015625h13.507812c7.449219 0 13.511719-6.058593 13.511719-13.507812s-6.0625-13.507813-13.511719-13.507813zm0 0" />
      </svg>
    ]
  ],
  mobileNavbarItemsNumber: { home: 0, cart: 1, deals: 3, notifications: 2, orders: 5 }
};

GetMenu.propTypes = {
  optionsList: array,
  mobileNavbarItemsNumber: object
};

export default GetMenu;
