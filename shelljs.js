const shell = require('shelljs');

if (shell.exec('git status').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
}
