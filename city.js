const EventEmitter = require('events');
const {Soldier} = require('./soldier');

class City {
  constructor(name, timeFactor) {
    this.name_ = name;
    this.corn_ = 100;
    this.gold_ = 100;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
    this.soldiers = {};
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
    }, this.timeFactor);
  }

  createSoldier() {
    if(this.corn_ >= 100 && this.gold_ >= 100) {
      this.corn_ -= 100;
      this.gold_ -= 100;
      let s = new Soldier('s', this.timeFactor_);
      this.soldiers['s'] = s;
    }
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
  }
}

module.exports = {City};
