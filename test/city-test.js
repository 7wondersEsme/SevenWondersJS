const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../city');

chai.use(chaiAsPromised);
chai.should();

describe('city.js', () => {
  describe('City', () => {
    let c;
    beforeEach(() => {
      c = new City('test', 1);
    });

    it('should create soldiers', () => {
      c.gold_.should.be.equal(100);
      c.corn_.should.be.equal(100);
      c.createSoldier().should.be.equal(true);
      c.createSoldier().should.be.equal(true);
      c.gold_.should.be.equal(80);
      c.corn_.should.be.equal(80);
      Object.keys(c.soldiers_).length.should.be.equal(2);
    });

    it('shouldn\'t create soldier without enough gold', () => {
      c.gold_ = 0;
      c.gold_.should.be.equal(0);
      c.corn_.should.be.equal(100);
      c.createSoldier().should.be.equal(false);
      c.gold_.should.be.equal(0);
      c.corn_.should.be.equal(100);
    });

    it('shouldn\'t create soldier without enough corn', () => {
      c.corn_ = 0;
      c.gold_.should.be.equal(100);
      c.corn_.should.be.equal(0);
      c.createSoldier().should.be.equal(false);
      c.gold_.should.be.equal(100);
      c.corn_.should.be.equal(0);
    });
  });
});
