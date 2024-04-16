
export interface IApiState<T = any> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}