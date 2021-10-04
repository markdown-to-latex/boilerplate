import * as fs from 'fs';

export function generateRandomNumberTex(): void {
    fs.writeFileSync(
        './dist/random-number.tex',
        `\\newcommand{\\showcaserandomnumber}{${Math.random()}}`,
        'utf8',
    );
}
