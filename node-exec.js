const util = require('util');
const childProcess = require('child_process');
const { assert } = require('console');
const exec = util.promisify(childProcess.exec);
const execFile = util.promisify(childProcess.execFile);

// DID NOT WORK
const spawn = util.promisify(childProcess.spawn);

async function lsExample() {
    console.log('\npromisify(execFile)');
    try {
        const { stdout, stderr } = await execFile('ls', ['-al', '/sdgsdg']);
        assert(false, 'Unreachable');
    } catch(e) {
        console.error('ERROR - Error code', e.code);
        console.error(e);
        assert(e.code === 2);
    }

    console.log('\nspawnSync: interactive bash "read"...');
    try {
        // Never reaches 'Spawn end?!'
        //await spawn('cat', { stdio: 'inherit' });
        const status =
            childProcess.spawnSync('bash', ['-c', 'read foo; echo $foo'], { stdio: 'inherit' });
        console.log('Status', status);
        assert(status.status === 0);
    } catch(e) {
        assert(false, 'Unreachable');
        console.error('ERROR - Error code', e.code);
        console.error(e);
    }
    console.log('Spawn end');

    console.log('\nspawnSync with executable not found...');
    try {
        const status =
            childProcess.spawnSync('/foobar', [], { stdio: 'inherit' });
        console.log('Status', status);
        assert(status.error instanceof Error);
        assert(status.status === null);
    } catch(e) {
        assert(false, 'Unreachable');
        console.error('ERROR - Error code', e.code);
        console.error(e);
    }

    console.log('\nspawnSync with executable not found...');
    try {
        const status =
            childProcess.spawnSync('cat', ['/foobar'], { stdio: 'inherit' });
        console.log('Status', status);
        assert(status.error === undefined);
        assert(status.status === 1);
    } catch(e) {
        assert(false, 'Unreachable');
        console.error('ERROR - Error code', e.code);
        console.error(e);
    }
}
lsExample();
