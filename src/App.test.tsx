import { render, screen } from '@testing-library/react';

import App from './App';

test('renders a compound button with correct data test id', () => {
  render(<App />);
  const linkElement = screen.getByTestId('compound-button');
  expect(linkElement).toBeInTheDocument();
});
