const childProcess = require('child_process');

// null: /dev/null ==     ignore
// true: capture          pipe
// false: do not capture  inherit

const STDIN_INHERIT = 0; // default
const STDIN_PIPE    = 1;
const STDIN_IGNORE  = 2;

const STDOUT_INHERIT = 0; // default
const STDOUT_PIPE    = 4;
const STDOUT_IGNORE  = 8;

const STDERR_INHERIT = 0; // default
const STDERR_PIPE    = 16;
const STDERR_IGNORE  = 32;

function runCommand(cmd, args, stdio, options) {
    const opt = {... options};
    if (!opt.stdio) {
        opt.stdio = [
            stdio[0] === true ? 'pipe' : 'inherit',
            stdio[1] === true ? 'pipe' : 'inherit',
            stdio[2] === true ? 'pipe' : 'inherit',
        ]
    }
}

function spawnSyncInherit(cmd, args) {
    return childProcess.spawnSync(cmd, args, {
        stdio: 'inherit'
    });
}

function spawnSyncPipe(cmd, args) {
    return childProcess.spawnSync(cmd, args, {
        stdio: ['ignore', 'pipe', 'inherit']
    });
}

function spawnSyncPipeAll(cmd, args) {
    return childProcess.spawnSync(cmd, args, {
        stdio: ['pipe', 'pipe', 'pipe']
    });
}

console.log('Just running... BEGIN');
spawnSyncInherit('docker', ['ps']);
console.log('END');

console.log('Capture stdout... BEGIN');
const res = spawnSyncPipe('docker', ['ps', '--format={{json .}}']);
console.log('END');
console.log(`Status ${res.status}, Stdout: ${res.stdout}`);
const containersStr = res.stdout.toString('utf8');
const containersStrArray = containersStr.split('\n').filter(s => s.length > 0);
const containersArray = containersStrArray.map(c => JSON.parse(c));
console.log(containersArray);

// console.log('Just running, but interactive... BEGIN');
// //const res2 = spawnSyncInherit('bash', ['-c', 'read foo']);
// spawnSyncPipeAll('bash', ['-c', 'read foo']);
// console.log('END');


// var Readable = require('stream').Readable;
// var s = new Readable()
// s.push('beep')    // the string you want
// s.push(null)      // indicates end-of-file basically - the end of the stream
// childProcess.spawnSync('cat', [], {
//     stdio: [s, 'inherit', 'inherit']
// });


console.log('Running "cat"...');
const spawn = require('child_process').spawn;
const child = spawn('cat');
child.stdout.on('data', (data) => {
    console.log(`stdout: "${data}"`);
});

child.stdin.write("Copy this!\n");
child.stdin.write("...and this.\n");
child.stdin.end();

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}.`);
});
