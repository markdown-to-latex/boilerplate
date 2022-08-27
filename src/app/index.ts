import * as argparse from 'argparse';
import { ArgumentParser, SubParser } from 'argparse';
import dataInit from './init';

export type SubParserAddFunction = (p: SubParser) => ArgumentParser;
export type SubParserActionFunction = (args: any) => void;

export interface SubParserAddInfo {
    addParser: SubParserAddFunction;
    action: SubParserActionFunction;
}

export const enum ArgumentAction {
    Init = 'init',
}

const subParserData: Record<ArgumentAction, SubParserAddInfo> = {
    [ArgumentAction.Init]: dataInit,
};

export interface Arguments {
    action: ArgumentAction;
}

export function createArgumentParser(): argparse.ArgumentParser {
    const parser = new argparse.ArgumentParser({
        description: 'YAXM Boilerplate',
    });
    const subParser = parser.add_subparsers({
        dest: 'action',
        required: true,
    });

    Object.values(subParserData).forEach(f => f.addParser(subParser));

    return parser;
}

export function getActionByActionName(name: ArgumentAction): SubParserActionFunction {
    return subParserData[name].action;
}