#!/usr/bin/env node

import {Arguments, createArgumentParser, getActionByActionName} from "./app";

function main() {
    const parser = createArgumentParser();
    const args: Arguments = parser.parse_args();

    getActionByActionName(args.action)(args);
}


main();
