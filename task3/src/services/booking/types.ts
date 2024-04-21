export type TBooking = {
  id: string;
  user: string;
  bookingdate: Date;
}

export type TBookingResponse = {
  data: TBooking[];
}