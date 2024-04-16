import { useState, useEffect } from 'react';
import { IApiState } from './types';

/**
 * Custom hook to fetch data from an API
 * @param url Contains the URL to fetch the data
 * @returns state Contains the data, isLoading and error
 */

const defaultState: IApiState = { data: null, isLoading: true, error: null };

const useApi = (url: string): IApiState => {

  const [state, setState] = useState<IApiState>(defaultState);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(totalData =>  setState({ data: totalData.data, isLoading: false, error: null }))
      .catch(error => setState({ data: null, isLoading: false, error }));
    return () => {
      // Reset state when the component unmounts
      setState(defaultState);
    }
  }, [url]);

  return state;
};

export default useApi