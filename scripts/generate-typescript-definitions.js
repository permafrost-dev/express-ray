const { chdir } = require('process');
const { execSync } = require('child_process');
const { existsSync, readFileSync, realpathSync, writeFileSync } = require('fs');

const projectPath = realpathSync(`${__dirname}/..`);

function removeImportCallsFromFile(filename) {
    if (!existsSync(filename)) {
        return;
    }

    const data = readFileSync(filename, { encoding: 'utf-8' }).replace(/import\(['"].*['"]\)\.?/g, '');

    writeFileSync(filename, data, { encoding: 'utf-8' });
}

function runBuildDts() {
    chdir(projectPath);
    execSync('./node_modules/.bin/dts-bundle-generator --no-check --no-banner -o ./dist/index.d.ts ./src/index.ts', {
        stdio: 'inherit',
        encoding: 'utf-8',
    });
}

function main() {
    runBuildDts();
    removeImportCallsFromFile(`${projectPath}/dist/index.d.ts`);
}

main();
