class Trader {
  constructor(name, timeFactor) {
    this.given_ = 0;
    this.taken_ = 0;
    this.type_ = 'gold';
    this.timeFactor = timeFactor;
  }

  give(amount, type) {
    this.type_ = type;
    this.taken_ = amount;
  }

  trade() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.taken_ === 0) {
          reject(new Error('Trade already done'));
        } else {
          this.given_ = Math.floor(this.taken_ * 1.1);
          this.taken_ = 0;
          resolve();
        }
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
