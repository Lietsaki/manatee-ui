import React from 'react';
import renderer from 'react-test-renderer';
import FloatingResponsiveMenu from './FloatingResponsiveMenu';
import { render } from '@testing-library/react';

// 1) Store the component in a variable
const menu = <FloatingResponsiveMenu />;

// TEST #1: Rendering the menu's content
test('Renders Floating Menu correctly', () => {
  // 1) Render the menu with react-testing-library in order to be able to get it by its text.
  const { getByText } = render(menu);
  getByText('Home');

  // 2) Create the element with renderer to create snapshots between each callback
  const rendererMenu = renderer.create(menu);

  // 3) Take a snapshot with Jest
  let tree = rendererMenu.toJSON();
  expect(tree).toMatchSnapshot();
});
