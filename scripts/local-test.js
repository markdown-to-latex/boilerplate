const child_process = require('child_process');

const v = child_process.execSync('git version', {
    stdio: ['pipe', 'pipe', 'pipe'],
});

console.log(`"${v.toString().split('\n')[0]}"`);
