import React from 'react'
import useApi from '../../hooks/useApi';

const ListData = () => {

  const { data, isLoading, error } = useApi('http://localhost:3001/api/bookings');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <ul>
      {data?.map((booking: any) => (
        <li key={booking.id}>{booking.comments}</li>
      ))}
    </ul>
  );

}

export default ListData;