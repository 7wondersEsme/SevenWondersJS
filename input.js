#!/usr/bin/env node
const readline = require('readline');

class Commands {
  constructor() {
    this.rl_ = readline.createInterface(process.stdin, process.stdout);
  }

  prompt(player) {
    const actions = [
      'Create army',
      'Send trader',
      'Offer',
      'Attack'
    ];
    return new Promise((resolve, reject) => {
      const handleAnswer = line => {
        if (line.match(/^[0123]$/)) {
          this.rl_.removeListener('line', handleAnswer);
          this.rl_.close();
          resolve(line);
        } else {
          console.log('Enter a correct action');
        }
      };
      setTimeout(() => {
        this.rl_.removeListener('line', handleAnswer);
        this.rl_.close();
        reject(new Error('Next player'));
      }, 5000);
      console.log(player.name);
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
      this.rl_.prompt();
      this.rl_.on('line', handleAnswer);
    });
  }
}

module.exports = {Commands};
