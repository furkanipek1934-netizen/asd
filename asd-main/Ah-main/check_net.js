const fs = require('fs');
const play = fs.readFileSync('game/play.html', 'utf8');
const server = fs.readFileSync('server.js', 'utf8');

// 1. Check socket connection parameters in play.html
const socketConnectMatch = play.match(/io\s*\([^)]*\)/g);
console.log('play.html socket connection calls:', socketConnectMatch);

// 2. Check client state emission in play.html
const stateEmitLines = [];
play.split('\n').forEach((l, i) => {
  if (l.includes("emit('state'") || l.includes('emit("state"') || l.includes("_socket.emit('state'")) {
    stateEmitLines.push({ line: i + 1, text: l.trim().slice(0, 120) });
  }
});
console.log('Client state emit lines:', stateEmitLines);

// 3. Check remote player rendering / interpolation in play.html
const interpLines = [];
play.split('\n').forEach((l, i) => {
  if (l.includes('SmoothReconciler') || l.includes('_otherPlayers') && (l.includes('lerp') || l.includes('targetX') || l.includes('renderX'))) {
    if (interpLines.length < 10) interpLines.push({ line: i + 1, text: l.trim().slice(0, 120) });
  }
});
console.log('Interp lines:', interpLines);
