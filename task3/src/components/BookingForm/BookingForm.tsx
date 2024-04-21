import React, { FC, useState }  from 'react';
import { TextField, Grid, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { createBooking } from '../../services/booking/bookingService';
import { IBookingFormProps } from './types';

const BookingForm: FC<IBookingFormProps> = ({ onBookingCreated }) => {

  const [form, setForm] = useState({name: '', date: ''});
  const [notification, setNotification] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      await createBooking({ user: `45aed627-c4f1-4156-8b05-e17cabc6b577`, bookingdate: new Date(date) })
      onBookingCreated()
      setNotification(null);
    } catch (e) {
      setNotification('Failed to create booking');
    }
    setFormSubmitted(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const { name, date } = form;

  return (
    <>  
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Name" name="name" value={name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={date} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <LoadingButton 
                  type="submit" 
                  loading={formSubmitted} 
                  variant="contained" color="primary"
                  data-testid="addBookingButton"
                >
                  Add Booking
                </LoadingButton>
            </Grid>
        </Grid>
      </form>
      <Snackbar 
        open={!!notification} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000} 
        message={notification || ''} 
        onClose={() => setNotification(null)} 
      />
    </>
);
}

export default BookingForm;