
import { expect } from '@jest/globals';
import { move } from "../../server/function/move";
import { Player } from '../../server/class/Player';
import { Maps } from '../../server/class/Maps';
import Vector from '../../server/class/Vector';

let m: Maps;
let p1: Player;
let p2: Player;
let p3: Player;

beforeEach(() => {
    m = new Maps(500,500);
    p1 = new Player('1',"heisenberg","red",30,30,20);
    p2 = new Player('2',"limitTopLeft","red",0,0,20);
    p3 = new Player('2',"limitBottomRight","red",1500,1500,20);
    m.addPlayer(p1);
    m.addPlayer(p2);
    m.addPlayer(p3);
});


describe('move player in a different direction', () => {
    test('move player 1 on the right', () => {
        m.players[0].vector = new Vector(p1,{x: 35,y: 30});
        move(m.players[0],m)
        expect(m.players[0].x).toBeGreaterThan(30);
        expect(m.players[0].y).toBe(30);
        
    })
    test('move player 1 on the left', () => {
        m.players[0].vector = new Vector(p1,{x: 25,y: 30});
        move(m.players[0],m)
        expect(m.players[0].x).toBeLessThan(30);
        expect(m.players[0].y).toBe(30);
    });
    test('move player 1 on the top', () => {
        m.players[0].vector = new Vector(p1,{x: 30,y: 25});
        move(m.players[0],m)
        expect(m.players[0].y).toBeLessThan(30);
        expect(m.players[0].x).toBe(30);
      });
    test('move player 1 on the bottom', () => {
        m.players[0].vector = new Vector(p1,{x: 30,y: 35});
        move(m.players[0],m)
        expect(m.players[0].y).toBeGreaterThan(30);
        expect(m.players[0].x).toBe(30);
    })
    test('player 1 not move', () => {
        m.players[0].vector = new Vector(p1,{x: 30,y: 30});
        move(m.players[0],m)
        expect(m.players[0].y).toBe(30);
        expect(m.players[0].x).toBe(30);
    })
});
describe('player can t move out of maps', () => {
    test('rigth limit of the map', () => {
        m.players[2].vector = new Vector(p1,{x: 1600,y: 1500});
        move(m.players[2],m)
        expect(m.players[2].x).toBe(1500);
        expect(m.players[2].y).toBe(1500);
        });
    test('left limit of the map', () => {
        m.players[1].vector = new Vector(p1,{x: -50,y: 0});
        move(m.players[1],m)
        expect(m.players[1].x).toBe(0);
        expect(m.players[1].y).toBe(0);
    });
    test('top limit of the map', () => {
        m.players[1].vector = new Vector(p1,{x: 0,y: -50});
        move(m.players[1],m)
        expect(m.players[1].x).toBe(0);
        expect(m.players[1].y).toBe(0);
    });
    test('limit bottom of the map', () => {
        m.players[1].vector = new Vector(p1,{x: -50,y: -50});
        move(m.players[1],m)
        expect(m.players[1].x).toBe(0);
        expect(m.players[1].y).toBe(0);
    });
});



