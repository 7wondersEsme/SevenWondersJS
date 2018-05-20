#!/usr/bin/env node
const readline = require('readline');

class Input {
  constructor() {
    this.rl_ = readline.createInterface(process.stdin, process.stdout);
  }

  prompt(player) {
    const actions = [
      'Create army',
      'Send trader with gold',
      'Send trader with corn',
      'Offer gold',
      'Offer corn',
      'Attack'
    ];
    return new Promise(resolve => {
      let timeout = 0;
      const handleAnswer = line => {
        if (line.match(/^[012345]$/)) {
          clearTimeout(timeout);
          this.rl_.removeListener('line', handleAnswer);
          resolve(line);
        } else {
          console.log('Enter a correct action');
        }
      };
      timeout = setTimeout(() => {
        this.rl_.removeListener('line', handleAnswer);
        resolve();
      }, 15000);
      console.log('----- ' + player.name + ' ------');
      const stats = player.stats();
      for (const s in stats) {
        if (Object.prototype.hasOwnProperty.call(stats, s)) {
          console.log(s + ': ' + stats[s]);
        }
      }
      console.log();
      for (let i = 0; i < actions.length; i++) {
        console.log(i.toString() + ': ' + actions[i]);
      }
      this.rl_.setPrompt('Choice: ');
      this.rl_.on('line', handleAnswer);
      this.rl_.prompt();
    });
  }

  close() {
    this.rl_.close();
  }
}

module.exports = {Input};
