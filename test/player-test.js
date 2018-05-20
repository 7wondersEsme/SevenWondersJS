const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Player} = require('../player');

chai.use(chaiAsPromised);
chai.should();

describe('player.js', () => {
  describe('Player', () => {
    let p;
    beforeEach(() => {
      p = new Player('test', 1);
    });

    afterEach(() => {
      p.endWorld();
    });

    it('should create 10 soldiers', async () => {
      p.createArmy();
      Object.keys(p.city.soldiers_).length.should.be.equal(10);
    });

    it('should create trader', async () => {
      p.city.gold_ = 200;
      p.sendTrader('gold').then(() => {
        p.city.corn_.should.be.equal(110);
      }).catch(() => {
        p.city.corn_.should.be.equal(100);
      });
      p.city.corn_.should.be.equal(0);
      p.city.gold_.should.be.equal(0);
    });

    it('should return stats', () => {
      p.stats().gold.should.be.equal(100);
      p.stats().corn.should.be.equal(100);
      p.stats().soldiers.alives.should.be.equal(0);
      p.stats().soldiers.hurts.should.be.equal(0);
      p.stats().life.should.be.equal(100000);
    });
  });

  describe('Attack', () => {
    let p1;
    let p2;
    beforeEach(() => {
      p1 = new Player('p1', 1);
      p2 = new Player('p2', 1);
    });

    afterEach(() => {
      p1.endWorld();
      p2.endWorld();
    });

    it('should attack other', async () => {
      p1.createArmy();
      p2.createArmy();
      await p1.attack(p2);
      p2.city.alives.should.be.equal(10);
      p2.city.hurts.should.be.equal(10);
      p1.city.alives.should.be.below(10);
      p1.city.hurts.should.be.equal(p1.city.alives);
    });
  });
});
