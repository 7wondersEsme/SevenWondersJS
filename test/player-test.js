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
});
