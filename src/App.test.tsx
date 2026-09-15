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

  it('renders Archduke page when navigating to /archduke', () => {
    window.history.pushState({}, '', '/archduke');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /Beethoven’s Piano Trio Op\. 97, “Archduke”/i })).toBeInTheDocument();
  });

  it('renders Subscribe page when navigating to /subscribe', () => {
    window.history.pushState({}, '', '/subscribe');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /Subscribe/i })).toBeInTheDocument();
  });
});
