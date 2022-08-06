'use strict';
const title = require('@md-to-latex/title');
const converter = require('@md-to-latex/converter');

function __prebuild() {
    title.generateTitleConfigs('.');
    console.log('> Title generation \x1b[32mcomplete\x1b[0m');

    let convertResult = converter.convertMarkdownFilesWithDiagnostic({
        rootDir: '.',
        diagnosticPrint: console.log,
        severity: 'ERROR',
    });
    if (!convertResult.success) {
        console.log('> Convert MarkDown files \x1b[31mfailed\x1b[0m');
        process.exit(1);
    } else {
        console.log('> Convert MarkDown files \x1b[32mcomplete\x1b[0m');
    }
}

module.exports = {
    prebuild: __prebuild,
};

if (require.main === module) {
    __prebuild();
}
