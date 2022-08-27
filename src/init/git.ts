import * as child_process from 'child_process';

export function getGitVersion(): string {
    const v = child_process.execSync('git version', {
        stdio: ['pipe', 'pipe', 'pipe'],
    });
    return v.toString().split('\n')[0];
}

export function createGitRepository(path: string): void {
    child_process.execSync('git init', {
        cwd: path,
        stdio: ['inherit', 'inherit', 'inherit'],
    });
}
