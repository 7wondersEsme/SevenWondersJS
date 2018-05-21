const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Soldier} = require('../app/soldier');

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
});
