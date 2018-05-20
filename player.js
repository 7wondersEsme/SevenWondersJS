const {City} = require('./city');

class Player {
  constructor(name, timeFactor) {
    this.name_ = name;
    this.timeFactor_ = timeFactor || 1000;
    this.city_ = new City(name, this.timeFactor_);
  }

  init() {
    this.city_.init();
  }

  createArmy() {
    for (let i = 0; i < 10; i++) {
      this.city_.createSoldier();
    }
  }

  sendTrader(type) {
    return this.city_.sendTrader(100, type);
  }

  attack(other) {
    return this.city_.attack(other.city_);
  }

  offer(type) {
    return this.city_.offering(100, type);
  }

  stats() {
    return {
      gold: this.city_.gold,
      corn: this.city_.corn,
      alives: this.city_.alives,
      hurts: this.city_.hurts,
      life: this.city_.life_
    };
  }

  get city() {
    return this.city_;
  }

  get name() {
    return this.name_;
  }

  endWorld() {
    this.city_.endWorld();
  }
}

module.exports = {Player};
