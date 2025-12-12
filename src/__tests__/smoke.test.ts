import { describe, expect, it } from 'vitest';

describe('Simple Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string comparison', () => {
    expect('hello').toBe('hello');
  });
});
