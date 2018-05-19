class Trader {
  constructor(name, amount, type, timeFactor) {
    this.given_ = 0;
    this.taken_ = amount;
    this.type_ = type;
    this.timeFactor = timeFactor;
  }

  trade() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.given_ = Math.floor(this.taken_ * 1.1);
        this.taken_ = 0;
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
