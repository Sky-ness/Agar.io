import { expect } from '@jest/globals';
import Vector from "../../server/class/Vector";
import { Player } from '../../server/class/Player';

let p1 = new Player('1',"heisenberg","red",30,30,30);
let v = new Vector(p1, {x:30,y:30});

beforeEach(() => {
    v = new Vector(p1, {x:30,y:30});
    p1 = new Player('1',"heisenberg","red",30,30,30);
})

// describe('compute for create vector', () => {
//     test('magnitude', () => {
//         expect(          ).toBe(          );
//         expect(          ).toBe(          );
//     });
//     test('direction', () => {
//         expect(           ).toBe(          );
//         expect(          ).toBe(         );
//     });
//     test('distanceX', () => {
//         expect(           ).toBe(          );
//         expect(          ).toBe(         );
//     });
//     test('distanceY', () => {
//         expect(            ).toBe(      );
//         expect(            ).toBe(      );
//       });
//   });
//   describe('vectors are limited', () => {
//     test('vector under max magnitude', () => {
//         expect(v.magnitude).toBeLessThan(5);
//         //
//         expect(v.magnitude).toBeGreaterThan(0);
//     });
//     test('vector above max magnitude', () => {
//         expect(            ).toBe(           );
//         expect(            ).toBe(           );
//      });
// });