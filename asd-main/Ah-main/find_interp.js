const fs = require('fs');
const play = fs.readFileSync('game/play.html', 'utf8');
const lines = play.split('\n');
lines.forEach((l, i) => {
  if (l.includes('_interpOtherPlayers')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
