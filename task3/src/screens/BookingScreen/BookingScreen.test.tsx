import { render, screen } from '@testing-library/react';

import { BookingScreen } from './index';
import '@testing-library/jest-dom'

describe('BookingScreen', () => {
  it('renders correctly', async () => {
    const { container } = render(<BookingScreen />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Bookings Manager')).toBeInTheDocument();
  });
});
