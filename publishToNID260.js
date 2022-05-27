const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const inputFile = readFileSync('source.html').toString('utf8');

// Ensure `out` directory is empty
execSync(`yarn clean`);

// Content interpolation via comments
const subjectIndexInterpolatedHTML = require('./helpers/content.indexlinklist').interpolate(
    readFileSync('subject.index.html').toString('utf8')
);

// Write final HTML
writeFileSync(
    'source.final.html',
    inputFile
        .replace('__SUBJECT_INDEX__', subjectIndexInterpolatedHTML)
);

// Run next step of the pipeline
execSync(`yarn make source.final.html`);

// Copy the file to the device
const mobiFile = readdirSync('out').find(file => /mobi$/i.test(file));
const outputFileName = 'test.mobi';
execSync(`cp out/${mobiFile} out/${outputFileName}`);
execSync(`mv -f out/${outputFileName} '/Volumes/NO NAME/eNews/${outputFileName}'`);
console.log('Book published to the Franklin NID-260!');