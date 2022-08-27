import * as  path from "path";

export function getBoilerplateDirectory() : string {
    return path.join(path.resolve(__dirname), '../../boilerplate/');
}

export function getBoilerplateConfigsDirectory(): string {
    return path.join(getBoilerplateDirectory(), 'configs');
}

export function getBoilerplateGenericDirectory(): string {
    return path.join(getBoilerplateDirectory(), 'generic');
}