import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Smoke Test', () => {
  it('renders the site title in the header', () => {
    render(<App />);
    // Checking if "Compagnia" appears in the header (link text)
    const titleElements = screen.getAllByText(/Compagnia/i);
    expect(titleElements.length).toBeGreaterThan(0);
  });
});
