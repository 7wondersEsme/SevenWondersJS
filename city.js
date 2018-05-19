const EventEmitter = require('events');
const {Soldier} = require('./soldier');
const {Trader} = require('./trader');
const {Divinity} = require('./divinity');

class City {
  constructor(name, timeFactor) {
    this.name_ = name;
    this.corn_ = 100;
    this.gold_ = 100;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
    this.soldiers_ = {};
    this.sId_ = 0;
    this.divinity = new Divinity('div', this.timeFactor_);
    this.life = 100000;
  }

  init() {
    this.divinity.init();
    this.divinity.worldEvents.on('favor', favor => {
      this.gold_ += favor.gold;
      this.corn_ += favor.corn;
    });
    this.divinity.worldEvents.on('blessing', favor => {
      this.gold_ += favor.gold;
      this.corn_ += favor.corn;
    });
    this.divinity.worldEvents.on('retribution', retribution => {
      defense(retribution);
    });
  }

  createSoldier() {
    if (this.corn_ >= 10 && this.gold_ >= 10) {
      this.corn_ -= 10;
      this.gold_ -= 10;
      const s = new Soldier((this.sId_++).toString(), this.timeFactor_);
      s.init();
      this.soldiers_[s.name] = s;
      return true;
    }
    return false;
  }

  sendTrader(amount, type) {
    return new Promise((resolve, reject) => {
      const g = type === 'gold' ? amount : 0;
      const c = type === 'corn' ? amount : 0;
      if (this.corn_ >= 100 + c && this.gold_ >= 100 + g) {
        this.corn_ -= 100 + c;
        this.gold_ -= 100 + g;
        const t = new Trader('trader', amount, type, this.timeFactor_);
        t.worldEvents.on('trade', r => {
          if (r.type === 'gold') {
            this.gold_ += r.amount;
          } else {
            this.corn_ += r.amount;
          }
          resolve();
        });
        t.trade();
      } else {
        reject();
      }
    });
  }

  power() {
    let power = 0;
    for (let s in this.soldiers_) {
      power += this.soldiers_[s].isAlive()*2 + this.so;
    }
  }

  defense(power) {
    if(power > )
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
    this.divinity.endWorld();
  }
}

module.exports = {City};
