
import { TRequestOptions } from './types';
import { config } from '../config';

const { maxRetries, maxRetryInterval } = config;

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry a function until it succeeds or the maximum number of retries is reached with exponential backoff.
 */
export const retry = async <T>(fn: () => Promise<T>, retries: number = maxRetries, retryInterval: number = maxRetryInterval ): Promise<T> => {
  try {
    return  await fn();
  } catch (error: any) {
    if (retries > 1) {
      await delay(retryInterval);
      return retry(fn, retries - 1, retryInterval * 2);
    } else {
      throw error;
    }
  }
}

export const fetchData = async (url: string, options: TRequestOptions) => {
  const result = await fetch(url, options)
  if(!result.ok) throw new Error("Failed to fetch")
  return await result.json()
}