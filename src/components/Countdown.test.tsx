import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Countdown from './Countdown';

describe('Countdown Component', () => {
  it('renders COMPAGNIA III heading and countdown labels', () => {
    render(<Countdown />);
    expect(screen.getByText('COMPAGNIA III')).toBeInTheDocument();
    expect(screen.getByText('September 16 at 7:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });
});
