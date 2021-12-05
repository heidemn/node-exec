const childProcess = require('child_process');

function spawnSyncPassthrough(cmd, args) {
    return childProcess.spawnSync(cmd, args, {
        stdio: 'inherit'
    });
}

function spawnSyncGetStdout(cmd, args) {
    return childProcess.spawnSync(cmd, args, {
        stdio: ['ignore', 'pipe', 'inherit']
    });
}

console.log('Just running... BEGIN');
spawnSyncPassthrough('docker', ['ps']);
console.log('END');

console.log('Capture stdout... BEGIN');
const res = spawnSyncGetStdout('docker', ['ps', '--format={{json .}}']);
console.log('END');
console.log(`Status ${res.status}, Stdout: ${res.stdout}`);
const containersStr = res.stdout.toString('utf8');
const containersStrArray = containersStr.split('\n').filter(s => s.length > 0);
const containersArray = containersStrArray.map(c => JSON.parse(c));
console.log(containersArray);
