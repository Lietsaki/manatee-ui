import React from 'react';
import renderer from 'react-test-renderer';
import UIButton1 from './UIButton1';
import { render, fireEvent } from '@testing-library/react';

// 1) Define a mock callback for the button
const mockCallback = jest.fn();

// 2) Store the component in a variable
const button = (
  <UIButton1 onClick={mockCallback}>
    <p>Cancel</p>
  </UIButton1>
);

// TEST #1: Rendering the button's content
test('Renders UIButton1 correctly', () => {
  // 1) Render the button with react-testing-library in order to be able to get it by its text.
  const { getByText } = render(button);
  getByText('Cancel');

  // 2) Create the element with renderer to create snapshots between each callback
  const rendererButton = renderer.create(button);

  // 3) Take a snapshot with Jest
  let tree = rendererButton.toJSON();
  expect(tree).toMatchSnapshot();
});

// TEST #2: onClick callback execution
test('Executes UIButton1 onClick callback', () => {
  // 1) Render the button with React Testing Library to trigger a click event
  const { getByRole } = render(button);
  const RTLButton = getByRole('button');
  fireEvent.click(RTLButton);

  // 2) Expect that the callback was called only once
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

// NOTE: The tab + enter callback execution is not tested because of the limited support Jest currently has, but it's been tested
// in the browser and works perfectly as well.
