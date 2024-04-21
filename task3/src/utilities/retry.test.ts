import { retry, fetchData } from './retry';

describe('retry', () => {
  describe("retry function", () => {
    it("should success in first attempt", async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const result = await retry(mockFn);
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  
    it("should success in after retries ", async () => {
      const mockFn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');    
      const result = await retry(mockFn, 3, 100);
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  
    it('should fail after max retries ', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('fail'));
      await expect(retry(mockFn, 2, 100)).rejects.toThrow('fail');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe("fetchData function", () => {

    beforeEach(() => {
      jest.clearAllMocks();
    })

    it("should return data when fetch is successful", async () => {
      const mockResponse = { data: [] };
      global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: jest.fn().mockResolvedValue(mockResponse) })) as jest.Mock;
      const result = await fetchData('url', { method: 'GET'});
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error ", async () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('fail'))) as jest.Mock;
      await expect(fetchData('url', { method: 'GET'})).rejects.toThrow('fail');
    });

  });
  
});