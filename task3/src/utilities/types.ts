
type THttpMethod = 'GET' | 'POST' | 'DELETE';

export type TRequestOptions = {
  method: THttpMethod;
  body?: any;
  headers?: HeadersInit;
}