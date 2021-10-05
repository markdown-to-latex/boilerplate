# Boilerplate

Mono-repository with all MarkDown To LaTeX Boilerplates

# Installation

## Requirements

- NodeJS and NPM
- XeLaTeX

## Quick Start

```console
npx @md-to-latex/manager init
```

In the provided CLI enter the project name and select features you would like to use.

![](https://github.com/markdown-to-latex/manager/blob/master/.docs/init.gif?raw=true)

## Building

```console
npx @md-to-latex
```

Will execute the following chain:
- Compile TypeScript (if feature selected)
- LaTeX code generation
- 2-times LaTeX building
- Post-processing

![](https://github.com/markdown-to-latex/manager/blob/master/.docs/build.gif?raw=true)

# Showcase

The source MarkDown file can be found at [src/md/main.md](src/md/main.md)

![](https://github.com/markdown-to-latex/manager/blob/master/.docs/doc.png?raw=true)