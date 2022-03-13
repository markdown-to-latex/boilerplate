'use strict';

import * as chokidar from 'chokidar';
import { execSync } from 'child_process';
import { FSWatcher } from 'chokidar';

interface WatcherContext {
    lastBuildTime: number;
    buildTimeCooldown: number;
}

const context: WatcherContext = {
    lastBuildTime: 0,
    buildTimeCooldown: 2 * 1000,
};

function build() {
    execSync('npm run build', {
        encoding: 'utf8',
        stdio: ['inherit', 'inherit', 'inherit'],
    });
}

const listener: (path: string) => void = path => {
    // If current datetime - lastBuild datetime < DELTA => do not build again!
    console.log(
        `> Updated \x1b[34m${path}\x1b[0m \x1b[35m${new Date().toISOString()}\x1b[0m`,
    );
    const currentTimestamp = new Date().getTime();
    if (currentTimestamp - context.lastBuildTime < context.buildTimeCooldown) {
        console.log(`> Build \x1b[31mskipped due to cooldown\x1b[0m`);

        // TODO: configurable behaviour
        // skip VS abort and restart
        return;
    }

    console.log('> Started \x1b[32mbuild\x1b[0m');
    build();
    context.lastBuildTime = new Date().getTime();
    console.log('> Build \x1b[32mfinished\x1b[0m');
};

const watcher: FSWatcher = chokidar
    .watch('src/**', {
        ignoreInitial: true,
    })
    .on('add', listener)
    .on('change', listener);

console.log('> Watcher \x1b[32mstarted\x1b[0m');
