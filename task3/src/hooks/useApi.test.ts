import useApi from "./useApi"
import { renderHook, waitFor } from '@testing-library/react';

describe('UseApi hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  it('fetch empty data successfully', async () => {

    const emptyResult = { data: [] };

    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...emptyResult }),
      })
    );

    const { result } = renderHook(() => useApi('http://localhost:3001/api/bookings'));
  
    await waitFor(() => 
      expect(result.current.data).toEqual(emptyResult.data)
    );
  })

  it('handles server errors', async () => {

    const errorMessage = 'Internal Server Error';
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: async () => Promise.reject({ message: errorMessage }),
      })
    );

    const { result } = renderHook(() => useApi('http://localhost:3001/api/bookings'));
  
    await waitFor(() => 
      expect(result.current.error?.message).toBe(errorMessage)
    );
  })
})
