import React, { FC, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton, Snackbar, TableHead } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchBookings, deleteBooking } from '../../services/booking/bookingService';

import { TBooking, TBookingResponse } from '../../services/booking/types';

const BookingsTable: FC = () => {

  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const bookingsRes: TBookingResponse  = await fetchBookings();
      setBookings(bookingsRes.data);
    } catch (err) {
        setNotification('Failed to fetch bookings');
    } finally {
        setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      const updatedBookings = bookings.filter((booking: TBooking) => booking.id !== id);
      setBookings(updatedBookings);
      setNotification("Deleted booking successfully")
    } catch {
      setNotification('Failed to delete booking');
    }
  }

  // hooks 
  useEffect(() => {
    handleFetch();
  }, []);
  
  if(loading) return <CircularProgress data-testid="bookingTableLoader" />
  
  return (
    <>
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody data-testid="bookingTableBody">
                  {bookings?.map((booking: any) => (
                      <TableRow key={booking.id}>
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>{booking.user}</TableCell>
                          <TableCell>{booking.bookingdate}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleDelete(booking.id)}>
                                <DeleteIcon/>
                            </IconButton>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
      <Snackbar 
        open={!!notification} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000} 
        message={notification || ''} 
        onClose={() => setNotification(null)} 
      />
    </>
  )

}

export default BookingsTable;