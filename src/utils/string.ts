export const camelToSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const camelToKebabCase = (str: string) =>
    str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
