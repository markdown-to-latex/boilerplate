import path from 'path';
import { FeatureKey, PromptAnswers } from './struct.js';
import inquirer, { CheckboxChoiceOptions } from 'inquirer';
import fs from 'fs';

function validateDirectory(directory: string): boolean {
    return !fs.existsSync(directory);
}

export async function promptQuestions(): Promise<PromptAnswers> {
    const { projectName }: { projectName: string } = await inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the project name',
            name: 'projectName',
        },
    ]);

    if (!validateDirectory(projectName)) {
        const { confirm }: { confirm: boolean } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message:
                    'Execute this script inside an empty directory.\n' +
                    `  Directory \x1b[34m${projectName}\x1b[0m \x1b[1malready exists\x1b[0m.\n` +
                    `\n\x1b[31m⛊\x1b[0m\x1b[1m Are you sure you want to continue?`,
            },
        ]);

        if (!confirm) {
            throw Error('Not confirmed');
        }
    }

    const features = [
        {
            key: FeatureKey.VsCodeConfigs,
            name: 'VSCode Configs',
            checked: true,
        },
        {
            key: FeatureKey.IdeaConfigs,
            name: 'IDEA Configs',
            checked: false,
        },
        new inquirer.Separator(),
        {
            key: FeatureKey.GithubCiConfigs,
            name: 'GitHub CI Configs',
        },
        {
            key: FeatureKey.GitlabCiConfigs,
            name: 'GitLab CI Configs',
            checked: true,
        },
        new inquirer.Separator(),
        {
            key: FeatureKey.Examples,
            name: 'Example files',
            checked: true,
        },
        {
            key: FeatureKey.TypeScript,
            name: 'Entrypoint for TypeScript code',
        },
        {
            key: FeatureKey.CreateGitRepository,
            name: 'Automatically create Git repository',
            checked: true,
        },
    ] as CheckboxChoiceOptions & { name: string; key: FeatureKey }[];

    const answers: { features: string[]; confirm: boolean } =
        await inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Select features',
                name: 'features',
                choices: features,
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: `Are you going to:
 -> \x1b[34mCreate directory \x1b[35m${path.resolve(projectName)}\x1b[0m
 -> \x1b[34mDownload boilerplate into mentioned directory\x1b[0m
 -> \x1b[34mUse features listeed above\x1b[0m
`,
            },
        ]);

    if (!answers.confirm) {
        throw Error('Not confirmed');
    }

    return {
        projectName,
        features: answers.features.map(
            featureName =>
                features.filter(
                    (value: { name: string }) => value.name == featureName,
                )[0].key,
        ),
    };
}
