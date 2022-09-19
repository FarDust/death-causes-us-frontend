import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StyledSearchBar from './StyledSearchBar';

describe('<StyledSearchBar />', () => {
  test('it should mount', () => {
    render(<StyledSearchBar />);
    
    const styledSearchBar = screen.getByTestId('StyledSearchBar');

    expect(styledSearchBar).toBeInTheDocument();
  });
});