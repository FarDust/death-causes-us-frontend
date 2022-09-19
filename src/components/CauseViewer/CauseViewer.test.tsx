import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CauseViewer from './CauseViewer';

describe('<CauseViewer />', () => {
  test('it should mount', () => {
    render(<CauseViewer />);
    
    const causeViewer = screen.getByTestId('CauseViewer');

    expect(causeViewer).toBeInTheDocument();
  });
});