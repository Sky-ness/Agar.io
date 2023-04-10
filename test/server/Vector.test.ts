import { expect } from '@jest/globals';
import Vector from "../../server/class/Vector";

describe('compute for create vector', () => {
    test('magnitude', () => {
        expect(          ).toBe(          );
        expect(          ).toBe(          );
    });
    test('direction', () => {
        expect(           ).toBe(          );
        expect(          ).toBe(         );
    });
    test('distanceX', () => {
        expect(           ).toBe(          );
        expect(          ).toBe(         );
    });
    test('distanceY', () => {
        expect(            ).toBe(      );
        expect(            ).toBe(      );
      });
  });
  describe('vectors are limited', () => {
    test('vector under max magnitude', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
    test('vector above max magnitude', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
});