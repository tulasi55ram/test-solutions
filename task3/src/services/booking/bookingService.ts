import { retry, fetchData } from '../../utilities/retry';

import { config } from '../../config';

import { TBooking } from './types';

const { apiUrl } = config;

export const fetchBookings = () => retry(() => fetchData(`${apiUrl}bookings`, { method: 'GET' }));

export const createBooking = (booking: Partial<TBooking>) => retry(() => fetchData(`${apiUrl}bookings`, { method: 'POST', body: JSON.stringify(booking) }));

export const deleteBooking = (id: string) => retry(() => fetchData(`${apiUrl}bookings/${id}`, { method: 'DELETE' }));

