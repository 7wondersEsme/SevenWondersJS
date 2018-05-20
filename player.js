const {City} = require('./city');

class Player {
  constructor(name, timeFactor) {
    this.name_ = name;
    this.timeFactor_ = timeFactor || 1000;
    this.city = new City(name, this.timeFactor_);
  }

  init() {
    this.city.init();
  }

  createArmy() {
    for (let i = 0; i < 10; i++) {
      this.city.createSoldier();
    }
  }

  sendTrader(type) {
    return this.city.sendTrader(100, type);
  }

  attack(other) {
    return this.city.attack(other);
  }

  stats() {
    return {
      gold: this.city.gold,
      corn: this.city.corn,
      soldiers: {alives: this.city.alives, hurts: this.city.hurts},
      life: this.city.life_
    };
  }

  endWorld() {
    this.city.endWorld();
  }
}

module.exports = {Player};
