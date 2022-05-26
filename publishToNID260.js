const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const cheerio = require('cheerio');

const inputFile = readFileSync('source.html').toString('utf8');

execSync(`yarn clean`);

// Content interpolation via comments

const makeIndexLinkList = require('./makeIndexLinkList');

const TAG_INDEX_LINK_LIST = '%indexlinklist';
const subjectIndexHtml = readFileSync('subject.index.html').toString('utf8');
const $subjectIndex = cheerio.load(subjectIndexHtml);
$subjectIndex('*').contents().filter(function () {
    if (this.nodeType !== 8) return;

    // is a comment DOM node
    const nodeValue = this.nodeValue.trim();
    if (!nodeValue.startsWith(TAG_INDEX_LINK_LIST)) return;

    const listText = nodeValue.substring(nodeValue.indexOf(TAG_INDEX_LINK_LIST) + TAG_INDEX_LINK_LIST.length);
    const listHTML = makeIndexLinkList(listText);



    $subjectIndex(listHTML).insertAfter(
        this
    );
});

writeFileSync(
    'source.final.html',
    inputFile
        .replace('__SUBJECT_INDEX__', $subjectIndex.html())
);

execSync(`yarn make source.final.html`);

const mobiFile = readdirSync('out').find(file => /mobi$/i.test(file));
const outputFileName = 'test.mobi';
execSync(`cp out/${mobiFile} out/${outputFileName}`);
execSync(`mv -f out/${outputFileName} '/Volumes/NO NAME/eBooks/${outputFileName}'`);
console.log('Book published to the Franklin NID-260!');