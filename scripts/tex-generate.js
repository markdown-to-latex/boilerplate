'use strict';
const title = require('@md-to-latex/title');
const converter = require('@md-to-latex/converter');

// Entrypoint for custom script

const custom = require('../dist/js/random-number-generator.js');
custom.generateRandomNumberTex();
console.log('> Random number generation (showcase) \x1b[32mcomplete\x1b[0m');

// END Entrypoint for custom script

title.generateTitleConfigs('.');
console.log('> Title generation \x1b[32mcomplete\x1b[0m');

converter.convertMarkdownFiles('.');
console.log('> Convert MarkDown files \x1b[32mcomplete\x1b[0m');
