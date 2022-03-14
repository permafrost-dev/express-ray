// @ts-nocheck

const { realpathSync } = require('fs');
const esbuild = require('esbuild');

const buildConfigs = [
    {
        basePath: `${__dirname}/..`,
        outfile: 'dist/index.cjs.js',
        format: 'cjs',
        entry: 'src/index.ts',
        bundle: true,
        minify: false,
        constants: {},
        platform: {
            name: 'node',
            version: 14,
        },
    },
    {
        basePath: `${__dirname}/..`,
        outfile: 'dist/index.es.mjs',
        format: 'esm',
        entry: 'src/index.ts',
        bundle: true,
        minify: false,
        constants: {},
        platform: {
            name: 'node',
            version: 14,
        },
    },
];

class Builder {
    config = {
        verbose: false,
        production: false,
    };

    write(msg) {
        process.stdout.write(`${msg}`.toString());
    }

    writeln(msg) {
        process.stdout.write(`${msg}\n`.toString());
    }

    compile() {
        const results = [];

        buildConfigs.forEach(buildConfig => {
            const result = esbuild.buildSync({
                logLevel: 'silent',
                absWorkingDir: buildConfig.basePath,
                entryPoints: [buildConfig.entry],
                outfile: buildConfig.outfile,
                bundle: buildConfig.bundle,
                format: buildConfig.format,
                platform: buildConfig.platform.name,
                target: `es2015`,
                allowOverwrite: true,
                minify: buildConfig.minify,
                metafile: true,
                external: ['axios', 'micromatch', 'node-ray'],
                define: {
                    __APP_VERSION__: `'${require(realpathSync(`${buildConfig.basePath}/package.json`, { encoding: 'utf-8' })).version}'`,
                    __COMPILED_AT__: `'${new Date().toUTCString()}'`,
                    ...buildConfig.constants,
                },
            });

            const text = esbuild.analyzeMetafileSync(result.metafile, {
                color: true,
            });

            result['meta'] = text;

            results.push(Object.assign({}, result));
        });

        return results;
    }

    sizeForDisplay(bytes) {
        let size = `${bytes / 1024}`.slice(0, 4);
        if (size.endsWith('.')) {
            size += '0';
        }
        return `${size} kb`;
    }

    async reportCompileResults(results) {
        results.errors.forEach(errorMsg => this.writeln(`* Error: ${errorMsg}`));
        results.warnings.forEach(msg => this.writeln(`* Warning: ${msg}`));

        Object.keys(results.metafile.outputs).forEach(fn => {
            this.writeln(`*   » created '${fn}' (${this.sizeForDisplay(results.metafile.outputs[fn].bytes)})`);
        });
    }

    processArgv() {
        const argMap = {
            '-v': { name: 'verbose', value: true },
            '--verbose': { name: 'verbose', value: true },
            '-p': { name: 'production', value: true },
            '--prod': { name: 'production', value: true },
            '--production': { name: 'production', value: true },
        };

        process.argv
            .slice(2)
            .map(arg => {
                const hasMappedArg = typeof argMap[arg] === 'undefined';
                return hasMappedArg ? { name: arg.replace(/^-+/, ''), value: true } : argMap[arg];
            })
            .forEach(data => (this.config[data.name] = data.value));
    }

    async run() {
        this.processArgv();

        if (this.config.verbose) {
            this.writeln(`* Using esbuild v${esbuild.version}.`);
        }

        this.write(`* Compiling library...${this.config.verbose ? '\n' : ''}`);

        const startedTs = new Date().getTime();
        const results = await this.compile();
        const finishedTs = new Date().getTime();

        if (this.config.verbose) {
            results.forEach(async result => await this.reportCompileResults(result));
        }

        this.writeln((this.config.verbose ? `* D` : `d`) + `one. (${finishedTs - startedTs} ms)`);

        // TODO: group summary by path/package name
        const groupedLines = {};

        const stripAnsiCodes = str => str.replace(/\x1b\[[0-9;]*m/g, '');

        for (const result of results) {
            /** @type {String[]} */
            const lines = result.meta.split('\n');

            const pattern = new RegExp('(node_modules/[^ \t]+)(.*[0-9.]+[gmk]b)(.*[0-9.]+%)');

            lines.forEach(line => {
                let matches = pattern.exec(stripAnsiCodes(line.replace(/[\s\t]{2, }/g, ' '))); // line.match(pattern);

                if (matches && matches.length) {
                    matches = matches.map(match => match.trim().replace(/[\s\t]+/g, ' '));
                    const prefix = matches[1].split('/').slice(0, 2).join('/');

                    if (!groupedLines[prefix]) {
                        groupedLines[prefix] = [];
                    }

                    if (!groupedLines[prefix].filter(item => item.includes(matches[1])).length) {
                        groupedLines[prefix].push(line);
                    }
                }
            });

            //console.log(groupedLines);

            this.writeln(lines.join('\n'));
        }
    }
}

new Builder().run();
