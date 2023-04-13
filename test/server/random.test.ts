import { expect } from '@jest/globals';
import { generateRandomNumber } from '../../server/function/random';

describe('should return a number between the min and max', () => {
    test('random', () => {
        const nb = generateRandomNumber(0,15);
        expect(nb).toBeGreaterThanOrEqual(0);
        expect(nb).toBeLessThanOrEqual(15);
        
    })
});

