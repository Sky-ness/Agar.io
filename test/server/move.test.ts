
import { expect } from '@jest/globals';
import { move } from "../../server/function/move";
import { Player } from '../../server/class/Player';
import { Maps } from '../../server/class/Maps';

let m = new Maps(500,500);
let p1 = new Player('1',"heisenberg","red",30,30,30);

beforeEach(() => {
    m = new Maps(500,500);
    p1 = new Player('1',"heisenberg","red",30,30,20);
    m.addPlayer(p1);
});

// describe('move player in a different direction', () => {
//     test('move player 1 on the right', () => {
//         expect(          ).toBe(          );
//         expect(          ).toBe(          );
//     });
//     test('move player 1 on the left', () => {
//         expect(           ).toBe(          );
//         expect(          ).toBe(         );
//     });
//     test('move player 1 on the top', () => {
//         expect(            ).toBe(      );
//         expect(            ).toBe(      );
//       });
//     test('move player 1 on the bottom', () => {
//         expect(            ).toBe(      );
//         expect(            ).toBe(      );
//     });
// });
// describe('player can t move out of maps', () => {
//     test('rigth limit of the map', () => {
//         expect(          ).toBe(          );
//         expect(          ).toBe(          );
//     });
//     test('left limit of the map', () => {
//         expect(           ).toBe(          );
//         expect(          ).toBe(         );
//     });
//     test('top limit of the map', () => {
//         expect(            ).toBe(      );
//         expect(            ).toBe(      );
//       });
//     test('bottom limit of the map', () => {
//         expect(            ).toBe(      );
//         expect(            ).toBe(      );
//     });
//     test('corner limit of the map', () => {
//         expect(            ).toBe(      );
//         expect(            ).toBe(      );
//     });
// });



