const { readConfig } = require('@md-to-latex/title/dist/config/config');
const fs = require('fs');
const {
    translit,
    getAbbreviation,
} = require('@md-to-latex/manager/dist/utils/filename');

function __postbuild() {
    const config = readConfig('md-to-latex-title.yml');

    const groupString = translit(config.title.report.author.group);
    const authorString = translit(config.general.author.name).replace(
        /[ .]/g,
        '',
    );
    const subjectAbbreviation = getAbbreviation(
        config.title.report.document.subject,
    );
    const typeAbbreviation = getAbbreviation(
        config.title.report.document.typeDative,
    );

    const filename =
        authorString +
        '_' +
        groupString +
        '_' +
        subjectAbbreviation +
        '_' +
        typeAbbreviation +
        '.pdf';

    fs.copyFileSync('out/index.pdf', filename);
}

module.exports = {
    postbuild: __postbuild,
};

if (require.main === module) {
    __postbuild();
}
