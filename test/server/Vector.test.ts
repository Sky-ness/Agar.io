import { expect } from '@jest/globals';
import Vector from "../../server/class/Vector";
import { Player } from '../../server/class/Player';


let p1: Player;
let p2: Player;
let v: Vector;
let v2: Vector;


beforeEach(() => {
    p1 = new Player('1',"heisenberg","red",30,30,30);
    p2 = new Player('2',"skyler","blue",30,30,20);
    v = new Vector(p1, {x:600,y:600});
    v2 = new Vector(p1,{x:33,y:33});
})

describe('compute for create vector', () => {
    test('direction', () => {
        expect(v2.direction).toBe(0.7853981633974483);
        
    });
    test('distanceX', () => {
        
        expect(v.distanceX).toBe(570);
    });
    test('distanceY', () => {
        expect(v2.distanceY).toBe(3);
      });
  });
  describe('vectors are limited', () => {
    test('vector under max magnitude', () => {
        v.deplacementX();
        expect(v.magnitude).toBe(5);
    });
    test('vector above max magnitude', () => {
        v2.deplacementX();
        expect(v2.magnitude).toBeLessThan(5);
    });
});

