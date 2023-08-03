'use strict';
const title = require('@md-to-latex/title');
const converter = require('@md-to-latex/converter');
const latexPrinter = require('@md-to-latex/yaxm-printer-latex');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

/** @type converter.diagnostic.DiagnoseSeverity */
const SEVERITY = 'ERROR';

function __prebuild() {
    title.generateTitleConfigs('.');
    console.log('> Title generation \x1b[32mcomplete\x1b[0m');

    let convertResult = converter.convertYaxmFiles({
        rootDir: '.',
        severity: SEVERITY,
        buildConfig: yaml.load(fs.readFileSync('yaxm-build.yml', 'utf-8')),
    });
    converter.diagnostic.printDiagnosticList(
        convertResult.diagnostic,
        console.log,
    );

    if (!convertResult.success) {
        console.log('> Convert MarkDown files \x1b[31mfailed\x1b[0m');
        process.exit(1);
    }

    const printer = latexPrinter.createPrinterLatex(
        latexPrinter.buildConfig(
            yaml.load(fs.readFileSync('yaxm-printer.yml', 'utf-8')),
        ),
    );
    const printerResult = convertResult.result.map(r => [
        r,
        printer.processNode(printer, r.fileNode),
    ]);
    printerResult.forEach(v => {
        const filepath = v[0].fileInfo.out;
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        fs.writeFileSync(filepath, v[1].result, 'utf-8');
    });

    const allPrinterDiagnostic = printerResult.flatMap(v => v[1].diagnostic);
    converter.diagnostic.printDiagnosticList(allPrinterDiagnostic, console.log);

    if (
        converter.diagnostic.diagnoseListHasSeverity(
            allPrinterDiagnostic,
            SEVERITY,
        )
    ) {
        console.log('> Convert MarkDown files \x1b[31mfailed\x1b[0m');
        process.exit(1);
    }

    console.log('> Convert MarkDown files \x1b[32mcomplete\x1b[0m');
}

module.exports = {
    prebuild: __prebuild,
};

if (require.main === module) {
    __prebuild();
}
