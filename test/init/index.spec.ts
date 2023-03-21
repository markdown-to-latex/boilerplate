import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import { FeatureKey, PromptAnswers } from '../../src/init/struct';
import { ArgumentsInit } from '../../src/app/init';
import { postProcess } from '../../src/init';

function projectPrepare(answers: PromptAnswers, args: ArgumentsInit) {
    const directory = path.join(args.path, answers.projectName);

    beforeAll(async () => {
        if (fs.existsSync(directory)) {
            fse.removeSync(directory);
            console.log('Removed directory with test project');
        }

        fs.mkdirSync('dist', { recursive: true });
        await postProcess(answers, args);
    });
}

describe('newProject: default project', () => {
    const answers: PromptAnswers = {
        projectName: 'default-project',
        features: [
            FeatureKey.TypeScript,
            FeatureKey.IdeaConfigs,
            FeatureKey.VsCodeConfigs,
            FeatureKey.GithubCiConfigs,
            FeatureKey.GitlabCiConfigs,
            FeatureKey.CreateGitRepository,
            FeatureKey.Examples,
        ],
    };

    const options: ArgumentsInit = {
        path: 'dist/tests',
    };
    const dir = path.join(options.path, answers.projectName);

    projectPrepare(answers, options);

    [
        '.',
        '.git',
        'package.json',
        'src/md/main.yaxm',
        'scripts/tex-build.js',
        '.idea',
        '.vscode',
        '.gitlab-ci.yml',
    ].forEach(value =>
        test(`In project: file ${value} exists`, () => {
            expect(fs.existsSync(path.join(dir, value))).toBeTruthy();
        }),
    );

    ['.idea-configs'].forEach(value =>
        test(`In project: file ${value} does not exists`, () => {
            expect(fs.existsSync(path.join(dir, value))).not.toBeTruthy();
        }),
    );

    // test('main.tex contains entrypoint', () => {
    //     expect(
    //         fs.readFileSync(
    //             path.join(dir, 'src/tex/main.tex'),
    //             'utf8',
    //         ),
    //     ).toContain('./dist/random-number.tex');
    // });

    test('package.json contains project name', () => {
        expect(
            fs.readFileSync(path.join(dir, 'package.json'), 'utf8'),
        ).toContain(answers.projectName);
    });

    // test('tex-prebuild.js contains entrypoint', () => {
    //     expect(
    //         fs.readFileSync(
    //             path.join(dir, 'scripts/tex-prebuild.js'),
    //             'utf8',
    //         ),
    //     ).toContain("require('../dist/js/random-number-generator.js')");
    // });
});

describe('newProject: no features', () => {
    const answers: PromptAnswers = {
        projectName: 'no-features',
        features: [],
    };

    const options: ArgumentsInit = {
        path: 'dist/tests',
    };
    const dir = path.join(options.path, answers.projectName);

    projectPrepare(answers, options);

    ['.', 'package.json', 'scripts/tex-build.js'].forEach(value =>
        test(`In project: file ${value} exists`, () => {
            expect(fs.existsSync(path.join(dir, value))).toBeTruthy();
        }),
    );

    [
        // 'src/md/main.yaxm',
        'src/ts',
        '.idea-configs',
        '.idea',
        '.github',
        '.vscode',
        '.git',
        '.gitlab-ci.yml',
    ].forEach(value =>
        test(`In project: file ${value} does not exists`, () => {
            expect(fs.existsSync(path.join(dir, value))).not.toBeTruthy();
        }),
    );

    test('Main tex does not contain entrypoint', () => {
        expect(
            fs.readFileSync(path.join(dir, 'src/tex/main.tex'), 'utf8'),
        ).not.toContain('./dist/random-number.tex');
    });

    test('package.json contains project name', () => {
        const packageJsonContent = fs.readFileSync(
            path.join(dir, 'package.json'),
            'utf8',
        );

        expect(packageJsonContent).toContain(answers.projectName);
        expect(packageJsonContent).not.toContain('"typescript"');
        expect(packageJsonContent).not.toContain('"ts-build"');
        expect(packageJsonContent).not.toContain('npm run ts-build');
    });

    test('tex-prebuild.js does not contain entrypoint', () => {
        expect(
            fs.readFileSync(path.join(dir, 'scripts/tex-prebuild.js'), 'utf8'),
        ).not.toContain("require('../dist/js/random-number-generator.js')");
    });
});

describe('newProject: +md -typescript', () => {
    const answers: PromptAnswers = {
        projectName: 'with-md-no-ts',
        features: [FeatureKey.Examples],
    };

    const options: ArgumentsInit = {
        path: 'dist/tests',
    };
    const dir = path.join(options.path, answers.projectName);

    projectPrepare(answers, options);

    ['.', 'package.json', 'scripts/tex-build.js', 'src/md/main.yaxm'].forEach(
        value =>
            test(`In project: file ${value} exists`, () => {
                expect(fs.existsSync(path.join(dir, value))).toBeTruthy();
            }),
    );

    ['.idea-configs', '.idea', '.github'].forEach(value =>
        test(`In project: file ${value} does not exists`, () => {
            expect(fs.existsSync(path.join(dir, value))).not.toBeTruthy();
        }),
    );

    test('Main tex does not contain entrypoint', () => {
        expect(
            fs.readFileSync(path.join(dir, 'src/tex/main.tex'), 'utf8'),
        ).not.toContain('./dist/random-number.tex');
    });

    test('tex-prebuild.js does not contain entrypoint', () => {
        expect(
            fs.readFileSync(path.join(dir, 'scripts/tex-prebuild.js'), 'utf8'),
        ).not.toContain("require('../dist/js/random-number-generator.js')");
    });

    test('main.yaxm does not contain ts latex command', () => {
        expect(
            fs.readFileSync(path.join(dir, 'src/md/main.yaxm'), 'utf8'),
        ).not.toContain('\\showcaserandomnumber');
    });
});
