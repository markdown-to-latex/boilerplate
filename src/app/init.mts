import { ArgumentParser, SubParser } from 'argparse';
import { SubParserAddInfo } from './index.mjs';
import { postProcess, promptQuestions } from '../init/index.mjs';

export interface ArgumentsInit {
    path: string;
}

function addParser(subParser: SubParser): ArgumentParser {
    const parser = subParser.add_parser('init', {
        help: 'Initialize the boilerplate',
    });

    parser.add_argument('-p', '--path', {
        required: false,
        default: '.',
        help: 'Path to execute',
    });
    return parser;
}

function action(args: ArgumentsInit) {
    console.log('Initializing...');

    const prompt = promptQuestions()
        .then(answers => postProcess(answers, args))
        .catch(e => console.error(e));
}

export default {
    addParser,
    action,
} as SubParserAddInfo;
