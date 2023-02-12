import { render, screen } from '@testing-library/react';
import '@testing-library/react';
import React from 'react';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Number Viewer/i)).toBeInTheDocument();
});
