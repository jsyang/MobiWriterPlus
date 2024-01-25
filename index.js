// Modifies the HTML to re-link the image sources according to their final record index in the MOBI file
// Sets the MOBI document title from meta tag
// Sets the MOBI document author from meta tag
// Minifies the HTML

const path = require('path');
const [NODE, SCRIPT, SOURCE_HTML] = process.argv;
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const cheerio = require('cheerio');
const minifyHTML = require('html-minifier').minify;

const html = readFileSync(SOURCE_HTML).toString('utf8');
const SOURCE_DIR = path.dirname(SOURCE_HTML);

const $ = cheerio.load(html);
const title = $('meta[name="title"]').attr('content');
const author = $('meta[name="author"]').attr('content');

// Ensure the img[src] attributes are replaced with record index references
const gifFiles = $('img[src]').map((i, el) => $(el).attr('src')).toArray();

gifFiles.forEach((file, i) => {
    $(`img[src="${file}"]`)
        .removeAttr('src')
        .attr('recindex', (i + 1).toString().padStart(5, '0'));
});


// Ensure the a[href] attributes are replaced with `filepos` values
// File position is the character position of the section to jump to
// Zero-padded 10 digit number (max 9GB addressable! wow!)

// Within the source HTML, we must ensure we use the `<p id="..."></a>` tags

const FILEPOS_PLACEHOLDER = '0'.repeat(10);
// Ensure the 
$('a[href^="#"]').each((i, el) => {
    $(el).attr('filepos', FILEPOS_PLACEHOLDER);
});

// The total length of the HTML content should not change from this point forward
// (otherwise it will throw off the filepos)
const fileDate = Date.now();
let finalHTML = minifyHTML($.html(), { collapseWhitespace: true, removeComments: true });

// Build the hash to filepos map
const hashToFilePosMap = {};
const extractHashFromP = p => p.split('="')[1].split('"')[0];

// Ensure that the filepos is offset to ensure correct display when clicking the link
// from within the viewer for the NID-260; if not offset, there will be parts of the HTML displayed
const DISPLAY_FILEPOS_OFFSET = 1;

finalHTML.match(/<p id="[a-zA-Z0-9\-]+">/g)?.forEach(matchedString => {
    const hash = extractHashFromP(matchedString);
    hashToFilePosMap[hash] = (finalHTML.indexOf(matchedString) + 1).toString().padStart(10, '0');
});

// Replace the placeholder with the actual file position
const extractHashFromA = a => a.split('="#')[1].split('"')[0];
finalHTML.match(/<a href="#[a-zA-Z0-9\-]+" filepos="0000000000">/g)?.forEach(matchedString => {
    const hash = extractHashFromA(matchedString);
    const filePos = hashToFilePosMap[hash];

    if (filePos) {
        finalHTML = finalHTML.replace(matchedString, `<a href="#${hash}" filepos="${filePos}">`);
    } else {
        finalHTML = finalHTML.replace(matchedString, `<a href="#${hash}"                     >`);
    }
});

const finalHTMLFile = `out/${fileDate}.html`;
const finalMOBIFile = `out/${fileDate}.mobi`;

writeFileSync(finalHTMLFile, finalHTML);

execSync(`./MobiWriterPlus ${finalHTMLFile} ${finalMOBIFile} --title='${title}' --author='${author}' ${gifFiles.map(f => path.join(SOURCE_DIR, f)).join(' ')}`);
