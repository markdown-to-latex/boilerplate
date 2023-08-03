'use strict';
const title = require('@md-to-latex/title');
const converter = require('@md-to-latex/converter');
const docxPrinter = require('@md-to-latex/yaxm-printer-docx');
const yaml = require('js-yaml');
const fs = require('fs');

/** @type converter.diagnostic.DiagnoseSeverity */
const SEVERITY = 'ERROR';

async function __prebuild() {
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

    const printer = docxPrinter.createPrinterDocx(
        docxPrinter.buildConfig(
            yaml.load(fs.readFileSync('yaxm-printer.yml', 'utf-8')),
        ),
    );
    const printerResult = await Promise.all(
        convertResult.result.map(async r => [
            r,
            await printer.processNode(printer, r.fileNode),
        ]),
    );
    const buff = await docxPrinter.printerResultToBuffer(
        printer,
        printerResult.flatMap(v => v[1].result),
    );
    fs.writeFileSync('out/main.docx', buff);

    // forEach(v => {
    //     const filepath = v[0].fileInfo.out;
    //     fs.mkdirSync(path.dirname(filepath), { recursive: true });
    //     fs.writeFileSync(filepath, v[1].result, 'utf-8');
    // });

    const allPostValidationDiagnostic = printerResult
        .flatMap(v => {
            console.log(v[1].result);
            return v[1].result;
        })
        .flatMap(n => docxPrinter.validateDocxRootNode(n));

    const allPrinterDiagnostic = printerResult.flatMap(v => v[1].diagnostic);
    const allDiagnostic = [
        ...allPrinterDiagnostic,
        ...allPostValidationDiagnostic,
    ];

    converter.diagnostic.printDiagnosticList(allDiagnostic, console.log);

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
    __prebuild()
        .then(() => {})
        .catch(e => console.error(e));
}
