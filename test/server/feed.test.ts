import { expect } from '@jest/globals';

import { Maps } from '../../server/class/Maps';
import { Player } from '../../server/class/Player';

import { feed } from "../../server/function/feed";
import { invincibility } from '../../server/function/feed';
import { scoreMove } from '../../server/function/feed';

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

describe('eat player', () => {
    test('player 1 was ate by player 2', () => {
        expect(          ).toBe(          );
        expect(          ).toBe(          );
    });

    test('player 2 was ate by player 1', () => {
        expect(           ).toBe(          );
        expect(          ).toBe(         );
    });
    test('', () => {
        expect(            ).toBe(      );
        expect(            ).toBe(      );
      });
  });
  
describe('eat food', () => {
    test('player 1 ates food', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
    test('player 1 ates food', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
});

describe('player 1 was invincible during 3 seconds', () => {
    test('player 1 can t be ate by player 2', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
    test('player 1 still eat food', () => {
        expect(            ).toBe(           );
        expect(            ).toBe(           );
    });
});