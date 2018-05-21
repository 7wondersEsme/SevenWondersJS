#!/usr/bin/env node

const {Player} = require('./app/player');
const {Input} = require('./app/input');

function play(player, other, action) {
  switch (action) {
    case '0':
      player.createArmy();
      break;
    case '1':
      player.sendTrader('gold');
      break;
    case '2':
      player.sendTrader('corn');
      break;
    case '3':
      player.offer('gold');
      break;
    case '4':
      player.offer('corn');
      break;
    case '5':
      player.attack(other);
      break;
    default:
      break;
  }
}

function tour(input, p1, p2) {
  input.prompt(p1).then(action => {
    play(p1, p2, action);
    if (p1.onGame && p2.onGame) {
      input.prompt(p2).then(action => {
        play(p2, p1, action);
        tour(input, p1, p2);
      });
    }
  }).catch(() => {
    input.prompt(p2).then(action => {
      play(p2, p1, action);
      if (p1.onGame && p2.onGame) {
        tour(input, p1, p2);
      }
    }).catch(() => {
      if (p1.onGame && p2.onGame) {
        tour(input, p1, p2);
      }
    });
  });
}

async function game() {
  const p1 = new Player('1', 1000);
  const p2 = new Player('2', 1000);
  const input = new Input();
  p1.worldEvents.on('lost', () => {
    console.log('-------------------');
    console.log('|  Player 2 won!  |');
    console.log('-------------------');

    p1.endWorld();
    p2.endWorld();
    input.close();
    process.exit(0);
  });
  p2.worldEvents.on('lost', () => {
    console.log('-------------------');
    console.log('|  Player 1 won!  |');
    console.log('-------------------');
    p1.endWorld();
    p2.endWorld();
    input.close();
    process.exit(0);
  });
  p1.init();
  p2.init();
  tour(input, p1, p2);
}

game();
