const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Soldier} = require('../soldier');

chai.use(chaiAsPromised);
chai.should();

describe('soldier.js', () => {
  describe('Soldier', () => {
    let s;
    beforeEach(() => {
      s = new Soldier('test', 1);
    });

    afterEach(() => {
      s.endWorld();
    });

    it('should be alive', async () => {
      s.isAlive.should.be.equal(true);
    });

    it('should die', async () => {
      s.isAlive.should.be.equal(true);
      s.init();
      await new Promise(resolve => {
        s.worldEvents.on('die', () => {
          resolve();
        });
      });
      s.isAlive.should.be.equal(false);
    });

    it('should hurt soldier', async () => {
      s.isHurt.should.be.equal(false);

      s.hurt();
      s.isHurt.should.be.equal(true);
    });

    it('should kill soldier', async () => {
      s.isAlive.should.be.equal(true);
      s.endWorld();
      s.isAlive.should.be.equal(false);
    });

    it('should emit event when soldier killed', async () => {
      s.isAlive.should.be.equal(true);
      s.worldEvents.on('die', () => {
        s.isAlive.should.be.equal(false);
      });
      s.endWorld();
    });
  });

/*    It('should update divinity\'s gold', async () => {
      g.gold.should.be.equal(0);

      await g.offeringGold(100);
      g.gold.should.be.equal(100);

      await g.offeringGold(1000);
      g.gold.should.be.equal(1100);

      await g.offeringGold(-1);
      g.gold.should.be.equal(0);

      await (g.offeringGold('aze')).should.be.rejectedWith(Error,
        /You didn't gave a number of gold to \b[a-zA-Z].*, Earth collapsed/);
    });
  });

  describe('Updated values for Favor and Blessings', () => {
    it('should have modified the values for favor', async () => {
      const g = new Divinity('test', 1);

      g.corn.should.be.equal(0);
      g.gold.should.be.equal(0);
      await Promise.all([
        g.offeringCorn(100),
        g.offeringGold(1000)
      ]);

      g.init();

      await new Promise(resolve => {
        g.worldEvents.on('favor', favor => {
          favor.corn.should.be.equal(10);
          favor.gold.should.be.equal(100);
          g.endWorld();
          resolve();
        });
      });
    });

    it('should have modified the values for blessings', async () => {
      const g = new Divinity('test', 1);

      g.corn.should.be.equal(0);
      g.gold.should.be.equal(0);
      await Promise.all([
        g.offeringCorn(100),
        g.offeringGold(1000)
      ]);

      g.init();

      await new Promise(resolve => {
        g.worldEvents.on('blessing', blessing => {
          blessing.corn.should.be.equal(10000);
          blessing.gold.should.be.equal(100000);
          g.endWorld();
          resolve();
        });
      });
    });
  }); */
});
