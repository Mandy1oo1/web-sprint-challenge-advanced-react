import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AppFunctional from './AppFunctional';

test('renders coordinates and steps correctly', () => {
  const { getByText } = render(<AppFunctional />);
  
  // Check if the initial coordinates and steps are rendered correctly
  expect(getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(getByText(/You moved 0 times/i)).toBeInTheDocument();
});

test('renders grid with active square', () => {
  const { getByText, getAllByText } = render(<AppFunctional />);
  
  // Check if the grid is rendered with the active square ("B")
  const activeSquare = getByText('B');
  expect(activeSquare).toBeInTheDocument();
  
  // Check if only one square is marked as active
  const activeSquares = getAllByText('B');
  expect(activeSquares.length).toBe(1);
});

test('moves "B" when arrow buttons are clicked', () => {
  const { getByText } = render(<AppFunctional />);
  
  // Click on the arrow buttons to move the "B"
  fireEvent.click(getByText('LEFT'));
  expect(getByText(/Coordinates \(1, 2\)/i)).toBeInTheDocument();

  fireEvent.click(getByText('UP'));
  expect(getByText(/Coordinates \(1, 1\)/i)).toBeInTheDocument();

  fireEvent.click(getByText('RIGHT'));
  expect(getByText(/Coordinates \(2, 1\)/i)).toBeInTheDocument();

  fireEvent.click(getByText('DOWN'));
  expect(getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
});

test('resets the grid when reset button is clicked', () => {
  const { getByText } = render(<AppFunctional />);
  
  // Click on the reset button
  fireEvent.click(getByText('reset'));

  // Check if the grid is reset to its initial state
  expect(getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(getByText(/You moved 0 times/i)).toBeInTheDocument();
  expect(getByText('B')).toBeInTheDocument();
});

test('updates email input value correctly', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');

  // Type in the email input
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  // Check if the value is updated correctly
  expect(emailInput.value).toBe('test@example.com');
});
