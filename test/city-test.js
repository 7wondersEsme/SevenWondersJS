const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../app/city');

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

    it('should have 100000 points of life', () => {
      c.life.should.be.equal(100000);
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
      c.alives.should.be.equal(2);
    });

    it('shouldn\'t create soldier without enough gold', () => {
      c.gold_ = 0;
      c.createSoldier().should.be.equal(false);
      c.gold.should.be.equal(0);
      c.corn.should.be.equal(100);
      Object.keys(c.soldiers_).length.should.be.equal(0);
      c.alives.should.be.equal(0);
    });

    it('shouldn\'t create soldier without enough corn', () => {
      c.corn_ = 0;
      c.createSoldier().should.be.equal(false);
      c.gold.should.be.equal(100);
      c.corn.should.be.equal(0);
      Object.keys(c.soldiers_).length.should.be.equal(0);
      c.alives.should.be.equal(0);
    });

    it('should delete soldier on death', async () => {
      c.createSoldier().should.be.equal(true);
      Object.keys(c.soldiers_).length.should.be.equal(1);
      await new Promise(resolve => {
        c.soldiers_['0'].worldEvents.on('die', () => {
          Object.keys(c.soldiers_).length.should.be.equal(0);
          c.alives.should.be.equal(0);
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
      c.alives.should.be.equal(1);
      c.hurts.should.be.equal(1);
    });
  });

  describe('Attack', () => {
    let c1;
    let c2;
    beforeEach(() => {
      c1 = new City('c1', 1);
      c2 = new City('c2', 1);
    });

    afterEach(() => {
      c1.endWorld();
      c2.endWorld();
    });

    it('attack < defense', async () => {
      c1.createSoldier();
      c1.life.should.be.equal(100000);
      await c1.defense(200, 0);
      c1.life.should.be.equal(100000);
    });

    it('attack > defense', async () => {
      c1.life.should.be.equal(100000);
      await c1.defense(500, 0);
      c1.life.should.be.equal(99500);
    });

    it('attack 1 vs 1', async () => {
      c1.createSoldier();
      c2.createSoldier();
      await c2.attack(c1);
      c1.soldiers_['0'].isHurt.should.be.equal(true);
      if (c2.soldiers_['0']) {
        c2.soldiers_['0'].isHurt.should.be.equal(true);
      } else {
        Object.keys(c2.soldiers_).length.should.be.equal(0);
      }
      c1.life.should.be.equal(100000);
    });

    it('attack 2 vs 1', async () => {
      c1.createSoldier();
      c2.createSoldier();
      c2.createSoldier();
      await c2.attack(c1);
      c1.soldiers_['0'].isHurt.should.be.equal(true);
      if (c2.soldiers_['0']) {
        c2.soldiers_['0'].isHurt.should.be.equal(true);
      } else {
        Object.keys(c2.soldiers_).length.should.be.equal(1);
      }
      c2.soldiers_['1'].isHurt.should.be.equal(false);
      c1.life.should.be.equal(99800);
    });
  });

  describe('Create trader', () => {
    let c;
    let c2;
    beforeEach(() => {
      c = new City('test', 1);
      c2 = new City('c2', 1);
    });

    it('should send a trader', async () => {
      c.gold_ = 200;
      await c.sendTrader(100, 'gold', 0);
      c.gold.should.be.equal(0);
      c.corn.should.be.equal(110);
    });

    it('shouldn\'t create trader without enough gold', async () => {
      await c.sendTrader(100, 'gold', 0);
      c.gold.should.be.equal(100);
      c.corn.should.be.equal(100);
    });

    it('shouldn\'t create soldier without enough corn', async () => {
      await c.sendTrader(100, 'corn', 0);
      c.gold.should.be.equal(100);
      c.corn.should.be.equal(100);
    });

    it('should attack trader', async () => {
      c2.gold_ = 1000;
      c2.corn_ = 100;
      for (let i = 0; i < 100; i++) {
        c2.createSoldier();
      }
      c.gold_ = 200;
      await c.sendTrader(100, 'gold', c2.alives);
      c.gold.should.be.equal(0);
      c.corn.should.be.equal(0);
    });
  });

  describe('Offering', () => {
    let c;
    beforeEach(() => {
      c = new City('c', 1);
    });

    afterEach(() => {
      c.endWorld();
    });

    it('should offer 100 gold', async () => {
      await c.offer(100, 'gold');
      c.divinity.gold.should.be.equal(100);
    });

    it('should offer 100 corn', async () => {
      await c.offer(100, 'corn');
      c.divinity.corn.should.be.equal(100);
    });
  });
});
