import React, { FC, useState }  from 'react';

import { Container, Typography, Box } from '@mui/material';

import { BookingsTable } from '../../components/BookingsTable';
import { BookingForm } from '../../components/BookingForm';

const BookingScreen: FC = () => {
  const [key, setKey] = useState<number>(0); // used to refresh the bookings table

  const refreshBookings = () => setKey(prevKey => prevKey + 1);
  
  return (
    <Container>
      <Box py={2}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Bookings Manager
        </Typography>
        <BookingForm onBookingCreated={refreshBookings} />
        <Box mt={4}>
          <BookingsTable key={key} />
        </Box>
      </Box>
    </Container>
  )
}

export default BookingScreen;