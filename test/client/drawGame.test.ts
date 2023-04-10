import { expect } from '@jest/globals';
import { Player } from '../../server/class/Player';
import { Maps } from '../../server/class/Maps';

let m = new Maps(500,500);
let p1 = new Player('1',"heisenberg","red",30,30,30);
let p2 = new Player('2',"skyler","blue",30,30,20);

beforeEach(() => {
    m = new Maps(500,500);
    p1 = new Player('1',"heisenberg","red",30,30,20);
    p2 = new Player('2',"skyler","blue",30,30,20);
    m.addPlayer(p1);
    m.addPlayer(p2);
});

describe('draw player', () => {
    test('player 1 is here', () => {
        expect(          ).toBe(          );
        expect(          ).toBe(          );
    });

    test('player 2 is here', () => {
        expect(           ).toBe(          );
        expect(          ).toBe(         );
    });
    test('player 1 and 2 is here', () => {
        expect(            ).toBe(      );
        expect(            ).toBe(      );
      });
  });
describe('during the invicibility', () => {
    test('player 1 has a rainbow color', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
    test('player 2 has a rainbow color', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
});
describe('draw food', () => {
    test('foods is here', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
});

