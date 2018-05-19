const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Trader} = require('../trader');

chai.use(chaiAsPromised);
chai.should();

describe('trader.js', () => {
  describe('Trader', () => {
    let t;
    beforeEach(() => {
      t = new Trader('test', 100, 'gold', 1);
    });

    it('should have 0 given, 0 taken', async () => {
      t.given.should.be.equal(0);
      t.taken.should.be.equal(100);
    });
  });

  describe('Trade', () => {
    let t;
    beforeEach(() => {
      t = new Trader('test', 100, 'gold', 1);
    });

    it('should change 100 corn to 110 gold', async () => {
      t.taken.should.be.equal(100);
      await t.trade();
      t.taken.should.be.equal(0);
      t.given.should.be.equal(110);
    });
  });
});
