import {ArgumentsInit} from "../app/init";
import child_process from "child_process";
import {FeatureKey, PromptAnswers} from "./struct";
import fs from "fs";
import * as fse from "fs-extra";
import path from "path";
import {camelToKebabCase} from "../utils/string";
import {getBoilerplateConfigsDirectory, getBoilerplateGenericDirectory} from "../boilerplate";
import {createGitRepository, getGitVersion} from "./git";

type PostProcessFunction = (
    answers: PromptAnswers,
    args: ArgumentsInit,
) => void;


const installBoilerplate: PostProcessFunction = function (answers, args) {
    const directory = path.join(args.path, answers.projectName);

    fse.mkdirSync(directory, {
        recursive: true,
    })
    fse.copySync(getBoilerplateGenericDirectory(), directory, {
        recursive: true,
        overwrite: true,
    });
}

const updatePackageJson: PostProcessFunction = function (answers, args) {
    let text = fs.readFileSync(
        path.join(args.path, answers.projectName, 'package.json'),
        'utf8',
    );

    text = text.replace(
        /"name": +"[^"]+"/g,
        `"name": "${camelToKebabCase(answers.projectName)}"`,
    );

    if (!answers.features.includes(FeatureKey.TypeScript)) {
        text = text.replace(/( *\n *)?"typescript": "[^"]+",?/g, '');
        text = text.replace(/"ts-build": "[^"]+",?/g, '');
        text = text.replace(/npm run ts-build && ?/g, '');

        console.log(
            `\x1b[32m♦\x1b[0m Removed TypeScript feature from package.json\x1b[0m`,
        );
    }

    fs.writeFileSync(
        path.join(args.path, answers.projectName, 'package.json'),
        text,
        'utf8',
    );
};

const setFeatures: PostProcessFunction = function (answers, args) {
    console.log(`\x1b[36m♢\x1b[0m Setting up features\x1b[0m`);
    const features = answers.features;
    const directory = path.join(args.path, answers.projectName);


    if (features.includes(FeatureKey.GithubCiConfigs)) {
        fse.copySync(
            path.join(getBoilerplateConfigsDirectory(), '.github'),
            path.join(directory, '.github'),
            {
                recursive: true,
                overwrite: true,
            }
        );

        console.log(
            `\x1b[32m♦\x1b[0m Added GitHub CI Configs feature\x1b[0m`,
        );
    }

    if (features.includes(FeatureKey.GitlabCiConfigs)) {
        fse.copySync(
            path.join(getBoilerplateConfigsDirectory(), '.gitlab-ci.yml'),
            path.join(directory, '.gitlab-ci.yml'),
            {
                overwrite: true,
            }
        );

        console.log(
            `\x1b[32m♦\x1b[0m Added GitLab CI Configs feature\x1b[0m`,
        );
    }

    if (features.includes(FeatureKey.VsCodeConfigs)) {
        fse.copySync(
            path.join(getBoilerplateConfigsDirectory(), '.vscode'),
            path.join(directory, '.vscode'),
            {
                recursive: true,
                overwrite: true,
            }
        );

        console.log(`\x1b[32m♦\x1b[0m Added VSCode Configs feature\x1b[0m`);
    }

    if (features.includes(FeatureKey.IdeaConfigs)) {
        fse.copySync(
            path.join(getBoilerplateConfigsDirectory(), '.idea'),
            path.join(directory, '.idea'),
            {
                recursive: true,
                overwrite: true,
            }
        );

        console.log(`\x1b[32m♦\x1b[0m Installed IDEA feature\x1b[0m`);
    }

    // TODO
    // if (!features.includes(FeatureKey.Examples)) {
    //     deleteFolderSyncRecursive(path.join(directory, 'src', 'md'));
    //
    //     console.log(`\x1b[32m♦\x1b[0m Removed MarkDown Example feature\x1b[0m`);
    // }

    // if (!features.includes(FeatureKey.TypeScript)) {
    //     deleteFolderSyncRecursive(path.join(directory, 'src', 'ts'));
    //
    //     const texGenerate = path.join(directory, 'scripts', 'tex-prebuild.js');
    //     fs.writeFileSync(
    //         texGenerate,
    //         fs
    //             .readFileSync(texGenerate, 'utf8')
    //             .replace(
    //                 /\/\/ Entrypoint for custom script.+\/\/ END Entrypoint for custom script/gs,
    //                 '',
    //             ),
    //         'utf8',
    //     );
    //
    //     const mainTex = path.join(directory, 'src', 'tex', 'main.tex');
    //     fs.writeFileSync(
    //         mainTex,
    //         fs
    //             .readFileSync(mainTex, 'utf8')
    //             .replace(
    //                 /% Entrypoint for custom script.+% END Entrypoint for custom script/gs,
    //                 '',
    //             ),
    //         'utf8',
    //     );
    //
    //     if (features.includes(FeatureKey.MarkDownExamples)) {
    //         const mainMd = path.join(directory, 'src', 'md', 'main.md');
    //         fs.writeFileSync(
    //             mainMd,
    //             fs
    //                 .readFileSync(mainMd, 'utf8')
    //                 .replace(/\$\$ \\showcaserandomnumber \$\$/gs, 'Nothing'),
    //             'utf8',
    //         );
    //     }
    //
    //     console.log(`\x1b[32m♦\x1b[0m Removed TypeScript entrypoint\x1b[0m`);
    // }

    if (features.includes(FeatureKey.CreateGitRepository)) {
        try {
            getGitVersion();
        } catch (ignored) {
            console.log(
                `\x1b[31m♦\x1b[0m Git not found. Cannot initialize repository\x1b[0m`,
            );
        }

        createGitRepository(directory);
    }

    console.log(`\x1b[32m♦\x1b[0m Features setup complete\x1b[0m`);
};


const execInit: PostProcessFunction = function (answers, args) {
    console.log(`\x1b[36m♢\x1b[0m Downloading Node Modules\x1b[0m`);
    const directory = path.join(args.path, answers.projectName);

    child_process.execSync('npm install -D', {
        cwd: directory,
        stdio: ['inherit', 'inherit', 'inherit'],
    });
    console.log(`\x1b[32m♦\x1b[0m Node Modules prepared\x1b[0m`);

    child_process.execSync('npm run prettier-fix', {
        cwd: directory,
        stdio: ['inherit', 'inherit', 'inherit'],
    });

    console.log(`\x1b[32m♦\x1b[0m Prettier applied\x1b[0m`);
};

const showSuccessMessage: PostProcessFunction = function (answers) {
    console.log(
        '\n\x1b[36m>\x1b[0m ' +
        `Project \x1b[34m${answers.projectName}\x1b[0m ` +
        'has been created.\x1b[0m' +
        '\n  \x1b[34m' +
        answers.projectName +
        '\x1b[0m\n\n' +
        '\x1b[36m>\x1b[0m ' +
        'Use \x1b[34mnpm run build\x1b[0m inside ' +
        'the project directory to build code',
    );
};

const postProcessFunctions: PostProcessFunction[] = [
    installBoilerplate,
    updatePackageJson,
    setFeatures,
    execInit,
    showSuccessMessage,
]

export function postProcess(answers: PromptAnswers, args: ArgumentsInit) {
    for (const fun of postProcessFunctions) {
        fun(answers, args);
    }
}