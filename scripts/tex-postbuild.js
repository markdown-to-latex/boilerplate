const { readConfig } = require('@md-to-latex/title/dist/config/config');
const fs = require('fs');

const _ruToEngMap = {
    й: 'y',
    ц: 'c',
    у: 'u',
    к: 'k',
    е: 'e',
    н: 'n',
    г: 'g',
    ш: 'sh',
    щ: 'sh',
    з: 'z',
    х: 'h',
    ъ: '',
    ф: 'f',
    ы: 'yu',
    в: 'v',
    а: 'a',
    п: 'p',
    р: 'r',
    о: 'o',
    л: 'l',
    д: 'd',
    ж: 'j',
    э: 'e',
    я: 'ya',
    ч: 'ch',
    с: 's',
    м: 'm',
    и: 'i',
    т: 't',
    ь: '',
    б: 'b',
    ю: 'yu',
};
const translateRuToEng = string =>
    string
        .split('')
        .map(c =>
            c.toLowerCase() !== c
                ? (_ruToEngMap[c.toLowerCase()] || c).toUpperCase()
                : _ruToEngMap[c.toLowerCase()] || c,
        )
        .join('');

const config = readConfig('md-to-latex-title.yml');

const groupString = translateRuToEng(config.title.report.author.group);
const authorString = translateRuToEng(
    config.general.author.name.replace(/[ .]/g, ''),
);
const subjectAbbreviation = translateRuToEng(
    config.title.report.document.subject,
)
    .replace(/[#№]/g, '')
    .replace(/([a-zA-Z])[a-zA-Z]+/g, '$1')
    .replace(/ /g, '')
    .toUpperCase();
const typeAbbreviation = translateRuToEng(
    config.title.report.document.typeDative,
)
    .replace(/[#№]/g, '')
    .replace(/([a-zA-Z])[a-zA-Z]+/g, '$1')
    .replace(/ /g, '')
    .toUpperCase();

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
