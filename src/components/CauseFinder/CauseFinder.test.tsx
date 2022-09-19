import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CauseFinder from './CauseFinder';

describe('<CauseFinder />', () => {
  test('it should mount', () => {
    render(<CauseFinder />);
    
    const causeFinder = screen.getByTestId('CauseFinder');

    expect(causeFinder).toBeInTheDocument();
  });
});