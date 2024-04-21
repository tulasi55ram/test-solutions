// Global constants (assume .env) used in the application

const API_URL = 'http://localhost:3001/api/1/';

const MAX_RETRIES = 3;

const MAX_RETRY_INTERVAL = 1000; // in milliseconds

const config = {
  apiUrl: API_URL,
  maxRetries: MAX_RETRIES,
  maxRetryInterval: MAX_RETRY_INTERVAL
}

export { config };