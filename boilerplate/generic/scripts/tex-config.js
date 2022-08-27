const { LatexBuilder } = require('@md-to-latex/manager/dist/latex/builder');

module.exports = {
    builder: LatexBuilder.fromPartialConfig({
        /**
         * Executable, that is being used for the LaTeX compilation
         */
        executable: process.env.WSL ? 'wsl.exe xelatex' : 'xelatex',

        /**
         * LaTeX providing packet. 'texlive' and 'miktex' are available
         */
        packet: 'texlive',
    }),
};
