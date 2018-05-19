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

    it('should have 100 gold/corn', () => {
      c.corn.should.be.equal(100);
      c.gold.should.be.equal(100);
    });
  });

  describe('Create soldier', () => {
    let c;
    beforeEach(() => {
      c = new City('test', 1);
    });

    it('should create soldiers', () => {
      c.createSoldier().should.be.equal(true);
      c.createSoldier().should.be.equal(true);
      c.gold.should.be.equal(80);
      c.corn.should.be.equal(80);
      Object.keys(c.soldiers_).length.should.be.equal(2);
    });

    it('shouldn\'t create soldier without enough gold', () => {
      c.gold_ = 0;
      c.createSoldier().should.be.equal(false);
      c.gold.should.be.equal(0);
      c.corn.should.be.equal(100);
      Object.keys(c.soldiers_).length.should.be.equal(0);
    });

    it('shouldn\'t create soldier without enough corn', () => {
      c.corn_ = 0;
      c.createSoldier().should.be.equal(false);
      c.gold.should.be.equal(100);
      c.corn.should.be.equal(0);
      Object.keys(c.soldiers_).length.should.be.equal(0);
    });

    it('should delete soldier on death', async () => {
      c.createSoldier().should.be.equal(true);
      Object.keys(c.soldiers_).length.should.be.equal(1);
      await new Promise(resolve => {
        c.soldiers_['0'].worldEvents.on('die', () => {
          Object.keys(c.soldiers_).length.should.be.equal(0);
          resolve();
        });
      });
    });
  });

  describe('Soldier actions', () => {
    let c;
    beforeEach(() => {
      c = new City('test', 1);
    });

    afterEach(() => {
      c.endWorld();
    });

    it('should have no power', async () => {
      c.power().should.be.equal(0);
    });

    it('should have power', async () => {
      c.createSoldier();
      c.power().should.be.equal(200);
    });

    it('should have no power on soldier death', async () => {
      c.createSoldier();
      c.power().should.be.equal(200);
      Object.keys(c.soldiers_).length.should.be.equal(1);
      await new Promise(resolve => {
        c.soldiers_['0'].worldEvents.on('die', () => {
          c.power().should.be.equal(0);
          resolve();
        });
      });
    });

    it('should have half power when hurt', () => {
      c.createSoldier();
      c.soldiers_['0'].hurt();
      c.power().should.be.equal(100);
    });
  });

  describe('Create trader', () => {
    let c;
    beforeEach(() => {
      c = new City('test', 1);
    });

    it('should send a trader', async () => {
      c.gold_ = 200;
      await c.sendTrader(100, 'gold');
      c.gold.should.be.equal(0);
      c.corn.should.be.equal(110);
    });

    it('shouldn\'t create trader without enough gold', async () => {
      await c.sendTrader(100, 'gold').should.be.rejectedWith(
        Error, 'not enough resources');
      c.gold.should.be.equal(100);
      c.corn.should.be.equal(100);
    });

    it('shouldn\'t create soldier without enough corn', async () => {
      await c.sendTrader(100, 'corn').should.be.rejectedWith(
        Error, 'not enough resources');
      c.gold.should.be.equal(100);
      c.corn.should.be.equal(100);
    });
  });
});
