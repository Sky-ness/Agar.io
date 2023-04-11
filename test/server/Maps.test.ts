import { expect } from '@jest/globals';
import { Maps } from "../../server/class/Maps";
import { Player } from '../../server/class/Player';

let m = new Maps(500,600);
let p1 = new Player('1',"heisenberg","red",600,700,30);
let p2 = new Player('2',"skyler","blue",30,30,20);

beforeEach(() => {
    m = new Maps(500,600);
    p1 = new Player('1',"heisenberg","red",30,30,20);
    p2 = new Player('2',"skyler","blue",30,30,20);
});

describe('Maps created with good dimension', () => {
    test('dimension corresponding', () => {
        expect(m.width).toBe(500);
        expect(m.height).toBe(600);
    });
})

describe('We can add player on the map', () => {
    test('add player 1', () => {
        m.addPlayer(p1);
        expect(m.players.length).toBe(1);
        expect(m.players[0]).toBe(p1);
    });
    test('add player 2', () => {
        m.addPlayer(p2);
        expect(m.players.length).toBe(1);
        expect(m.players[0]).toBe(p2);
    });
    test('add all players', () => {
        m.addPlayer(p1);
        m.addPlayer(p2);
        expect(m.players.length).toBe(2);
        expect(m.players[0]).toBe(p1);
        expect(m.players[1]).toBe(p2);
    });
});
describe('We can remove player on the map', () => {
    test('remove player 1', () => {
        m.addPlayer(p1);
        m.removePlayer('1');
        expect(m.players.length).toBe(0);
    });
});
describe('We can sort each player on the map with his score', () => {
    test('player 1 has first and player 2 has second', () => {
        m.addPlayer(p1);
        m.addPlayer(p2);
        m.sortPlayer();
        expect(m.players[0]).toBe(p1);
        expect(m.players[1]).toBe(p2);
    });
});
describe('player was out of bounds', () => {
    test('player 1 was out of bounds on X position', () => {
        expect(m.outOfBoundsX(m.players[0])).toBe(true);
        m.players[0].x = -100 ;
        expect(m.outOfBoundsX(m.players[0])).toBe(true);
        m.players[0].x = 300 ;
        expect(m.outOfBoundsX(m.players[0])).toBe(false);
    });
    test('player 2 was out of bounds on Y position', () => {
        expect(m.outOfBoundsY(m.players[0])).toBe(true);
        m.players[0].y = -100 ;
        expect(m.outOfBoundsY(m.players[0])).toBe(true);
        m.players[0].y = 300 ;
        expect(m.outOfBoundsY(m.players[0])).toBe(false);
    });
});
// describe('random foods spawn with good number', () => {
//     test('200 foods are generate', () => {
//         expect(          ).toBe(          );
//         expect(          ).toBe(          );
//     });
//     test('50 foods are generate', () => {
//         expect(           ).toBe(          );
//         expect(          ).toBe(         );
//     });
// });
// describe('You can be feed on the map', () => {
//     test('player 1 can eat player 2', () => {
//         expect(          ).toBe(          );
//         expect(          ).toBe(          );
//     });
//     test('player 1 can eat food', () => {
//         expect(           ).toBe(          );
//         expect(          ).toBe(         );
//     });
// });

