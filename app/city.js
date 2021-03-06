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
    this.divinity_ = new Divinity('div', this.timeFactor_);
    this.life_ = 100000;
  }

  init() {
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', favor => {
      this.gold_ += favor.gold;
      this.corn_ += favor.corn;
    });
    this.divinity_.worldEvents.on('blessing', favor => {
      this.gold_ += favor.gold;
      this.corn_ += favor.corn;
    });
    this.divinity_.worldEvents.on('retribution', retribution => {
      this.defense(retribution, 0);
      if (this.life_ < 0) {
        this.worldEvents_.emit('burned');
      }
    });
  }

  offer(amount, type) {
    if (type === 'gold') {
      return this.divinity_.offeringGold(amount);
    }
    return this.divinity_.offeringCorn(amount);
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

  sendTrader(amount, type, ennemies) {
    return new Promise(resolve => {
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
        t.trade(this.alives, ennemies);
      } else {
        resolve();
      }
    });
  }

  power() {
    let power = 0;
    for (const s in this.soldiers_) {
      if (Object.prototype.hasOwnProperty.call(this, 'soldiers_')) {
        power += 100 + (!this.soldiers_[s].isHurt * 100);
      }
    }
    return power;
  }

  defense(attack, valids) {
    return new Promise(resolve => {
      if (attack > this.power()) {
        this.life_ -= attack - this.power();
      }
      if (this.life_ < 0) {
        this.worldEvents_.emit('burned');
      }
      let attackBack = 0;
      for (const s in this.soldiers_) {
        if (Object.prototype.hasOwnProperty.call(this, 'soldiers_')) {
          if (valids > 0 && !this.soldiers_[s].isHurt) {
            this.soldiers_[s].hurt();
            attackBack++;
            valids--;
          }
        }
      }
      resolve(attackBack);
    });
  }

  attack(otherCity) {
    return new Promise(resolve => {
      let valids = 0;
      for (const s in this.soldiers_) {
        if (Object.prototype.hasOwnProperty.call(this, 'soldiers_')) {
          if (this.soldiers_[s].isAlive && !this.soldiers_[s].isHurt) {
            valids++;
          }
        }
      }
      otherCity.defense(this.power(), valids).then(attackBack => {
        for (const s in this.soldiers_) {
          if (Object.prototype.hasOwnProperty.call(this, 'soldiers_')) {
            if (attackBack > 0 && !this.soldiers_[s].isHurt) {
              if (Math.random() < 0.80) {
                this.soldiers_[s].hurt();
              } else {
                this.soldiers_[s].kill();
              }
              attackBack--;
            }
          }
        }
        resolve();
      });
    });
  }

  get alives() {
    return Object.keys(this.soldiers_).length;
  }

  get hurts() {
    let count_ = 0;
    for (const s in this.soldiers_) {
      if (Object.prototype.hasOwnProperty.call(this, 'soldiers_')) {
        if (this.soldiers_[s].isHurt) {
          count_++;
        }
      }
    }
    return count_;
  }

  get divinity() {
    return this.divinity_;
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
    this.divinity_.endWorld();
    for (const s in this.soldiers_) {
      if (Object.prototype.hasOwnProperty.call(this, 'soldiers_')) {
        this.soldiers_[s].endWorld();
      }
    }
  }
}

module.exports = {City};
