export const enum FeatureKey {
    VsCodeConfigs = 'vscode-configs',
    IdeaConfigs = 'idea-configs',
    GithubCiConfigs = 'github-ci-configs',
    GitlabCiConfigs = 'gitlab-ci-configs',
    Examples = 'examples',
    TypeScript = 'typescript',
    CreateGitRepository = 'create-git-repository',
}

export interface PromptAnswers {
    projectName: string;
    features: FeatureKey[];
}
