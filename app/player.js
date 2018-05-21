const EventEmitter = require('events');
const {City} = require('./city');

class Player {
  constructor(name, timeFactor) {
    this.name_ = name;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
    this.city_ = new City(name, this.timeFactor_);
    this.onGame_ = true;
  }

  init() {
    this.city_.init();
    this.city_.worldEvents.on('burned', () => {
      this.onGame_ = false;
      this.worldEvents_.emit('lost');
      this.endWorld();
    });
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
    return this.city_.offer(100, type);
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

  get worldEvents() {
    return this.worldEvents_;
  }

  get onGame() {
    return this.onGame_;
  }

  endWorld() {
    this.city_.endWorld();
  }
}

module.exports = {Player};
