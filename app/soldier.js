const EventEmitter = require('events');

class Soldier {
  constructor(name, timeFactor) {
    this.name_ = name || 'UNKSOLDIER';
    this.hurt_ = false;
    this.alive_ = true;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
    this.age_ = 0;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      this.age_++;
      if (!this.alive_ || Math.random() > 1 - ((this.age_ - 30) / 100.0)) {
        this.kill();
      }
    }, this.timeFactor);
  }

  hurt() {
    this.hurt_ = true;
  }

  kill() {
    this.worldEvents_.emit('die');
    this.endWorld();
  }

  get isHurt() {
    return this.hurt_;
  }

  get isAlive() {
    return this.alive_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get age() {
    return this.age_;
  }

  endWorld() {
    this.alive_ = false;
    clearInterval(this.gaiaInterval_);
  }
}

module.exports = {Soldier};
