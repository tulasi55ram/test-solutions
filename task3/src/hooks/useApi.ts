import { useState, useEffect } from 'react';
import { IApiState } from './types';

/**
 * Custom hook to fetch data from an API
 * @param url Contains the URL to fetch the data
 * @returns state Contains the data, isLoading and error
 */
const useApi = (url: string): IApiState => {
  const [state, setState] = useState<IApiState>({ data: null, isLoading: true, error: null });

  useEffect(() => {
    let requestActive = true // Handling delay responses from the server
    fetch(url)
      .then(res => res.json())
      .then(totalData => requestActive && setState({ data: totalData.data, isLoading: false, error: null }))
      .catch(error => requestActive && setState({ data: null, isLoading: false, error }));
    return () => { requestActive = false }
  }, [url]);

  return state;
};

export default useApi