import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Director from './Director';
import Events from './Events';
import Musicians from './Musicians';
import Contact from './Contact';
import Bio from './Bio';

describe('Page Components Smoke Tests', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    );
  };

  it('renders Home page correctly', () => {
    renderWithRouter(<Home />);
    // Check for Compagnia logo and the COMPAGNIA III announcement
    expect(screen.getByAltText(/Compagnia Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/COMPAGNIA III/i)).toBeInTheDocument();
  });

  it('renders About page correctly', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
  });

  it('renders Director page correctly', () => {
    renderWithRouter(<Director />);
    expect(screen.getByText(/Iona Batchelder, Director/i)).toBeInTheDocument();
  });

  it('renders Events page correctly', () => {
    renderWithRouter(<Events />);
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
  });

  it('renders Musicians page correctly', () => {
    renderWithRouter(<Musicians />);
    expect(screen.getByText(/Musicians/i)).toBeInTheDocument();
  });

  it('renders Contact page correctly', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('renders Bio page for a musician correctly', () => {
    render(
      <MemoryRouter initialEntries={['/isabella-geis']}>
        <Routes>
          <Route path="/:musicianId" element={<Bio />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Isabella Geis/i })).toBeInTheDocument();
  });

  it('renders Bio page for Zhu Wang correctly', () => {
    render(
      <MemoryRouter initialEntries={['/zhu-wang']}>
        <Routes>
          <Route path="/:musicianId" element={<Bio />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Zhu Wang/i })).toBeInTheDocument();
  });
});
