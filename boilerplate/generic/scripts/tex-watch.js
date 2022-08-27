'use strict';

const { createWatcher } = require('@md-to-latex/manager/dist/latex/watcher');
const { spawn } = require('child_process');

createWatcher({
    /**
     * LatexBuilder object
     */
    builder: require('./tex-config').builder,

    /**
     * "Kill" will kill current process, if there are any changes
     * "Wait" will wait current process end, if there are any changes
     */
    killType: 'Kill',

    /**
     * The script will be executed after a successful build
     */
    postBuild: require('./tex-postbuild').postbuild,

    /**
     * The script will be executed before a build
     */
    preBuild: require('./tex-prebuild').prebuild,
});
