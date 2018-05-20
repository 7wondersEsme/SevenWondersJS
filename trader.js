const EventEmitter = require('events');

class Trader {
  constructor(name, amount, type, timeFactor) {
    this.given_ = 0;
    this.taken_ = amount;
    this.type_ = type;
    this.timeFactor = timeFactor;
    this.worldEvents_ = new EventEmitter();
  }

  trade(protection, ennemies) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.given_ = Math.floor(this.taken_ * 1.1);
        this.taken_ = 0;
        if (Math.random() < ennemies / (1 + (100 * protection))) {
          this.given_ = 0;
        }
        this.worldEvents_.emit('trade', {
          type: this.type, amount: this.given_
        });
        resolve();
      }, this.timeFactor * 10);
    });
  }

  kill() {
    this.taken_ = 0;
    this.given_ = 0;
  }

  get given() {
    return this.given_;
  }

  get taken() {
    return this.taken_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }
}

module.exports = {Trader};
