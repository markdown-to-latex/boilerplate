'use strict';

const fs = require('fs');
fs.mkdirSync('./out', {
    recursive: true,
});

const execFlagsEnv =
    process.env.NODE_ENV === 'production' ? [] : ['-synctex=1'];

const execFlags = [
    '-file-line-error',
    '-interaction=nonstopmode',
    '-shell-escape',
    '-halt-on-error',
    '-output-format=pdf',
    '-output-directory=./out',
];

const entrypointFile = 'index.tex';
const executable = 'xelatex';

const { execSync } = require('child_process');
execSync(
    executable +
        ' ' +
        [...execFlags, ...execFlagsEnv].join(' ') +
        ' ' +
        entrypointFile,
    {
        encoding: 'utf8',
        stdio: ['inherit', 'inherit', 'inherit'],
    },
);
