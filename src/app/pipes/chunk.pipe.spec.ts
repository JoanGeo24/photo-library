import { ChunkPipe } from './chunk.pipe';

describe('ChunkPipe', () => {
  let pipe: ChunkPipe;

  beforeEach(() => {
    pipe = new ChunkPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should chunk the array into subarrays', () => {
    const inputArray = [1, 2, 3, 4, 5, 6];
    const chunkSize = 2;
    const result = pipe.transform(inputArray, chunkSize);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('should handle empty input array', () => {
    const inputArray: any[] = [];
    const chunkSize = 2;
    const result = pipe.transform(inputArray, chunkSize);
    expect(result).toEqual([]);
  });

  it('should handle chunkSize larger than array length', () => {
    const inputArray = [1, 2, 3];
    const chunkSize = 5;
    const result = pipe.transform(inputArray, chunkSize);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should handle uneven chunk sizes', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const chunkSize = 2;
    const result = pipe.transform(inputArray, chunkSize);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });
});