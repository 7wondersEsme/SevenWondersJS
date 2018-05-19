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
    this.life_ = 100000;
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
      this.defense(retribution);
    });
  }

  createSoldier() {
    if (this.corn_ >= 10 && this.gold_ >= 10) {
      this.corn_ -= 10;
      this.gold_ -= 10;
      const s = new Soldier((this.sId_++).toString(), this.timeFactor_);
      s.worldEvents.on('die', () => {
        delete this.soldiers_[s.name];
      });
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
        reject(new Error('not enough resources'));
      }
    });
  }

  power() {
    let power = 0;
    for (const s in this.soldiers_) {
      power += 100 + (!this.soldiers_[s].isHurt * 100);
    }
    return power;
  }

  defense(attack, valids) {
    return new Promise(resolve => {
      if (attack > this.power()) {
        this.life_ -= attack - this.power();
      }
      let attackBack = 0;
      for (const s in this.soldiers_) {
        if (valids > 0 && !this.soldiers_[s].isHurt) {
          this.soldiers_[s].hurt();
          attackBack++;
          valids--;
        }
      }
      resolve(attackBack);
    });
  }

  attack(otherCity) {
    return new Promise(resolve => {
      let valids = 0;
      for (const s in this.soldiers_) {
        if (this.soldiers_[s].isAlive && !this.soldiers_[s].isHurt) {
          valids++;
        }
      }
      otherCity.defense(this.power(), valids).then(attackBack => {
        for (const s in this.soldiers_) {
          if (attackBack > 0 && !this.soldiers_[s].isHurt) {
            if (Math.random() < 0.80) {
              this.soldiers_[s].hurt();
            } else {
              this.soldiers_[s].kill();
            }
            attackBack--;
          }
        }
        resolve();
      });
    });
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get life() {
    return this.life_;
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
    for (const s in this.soldiers_) {
      this.soldiers_[s].endWorld();
    }
  }
}

module.exports = {City};
