// Modifies the HTML to re-link the image sources according to their final record index in the MOBI file
// Sets the MOBI document title from meta tag
// Sets the MOBI document author from meta tag
// Minifies the HTML

const [NODE, SCRIPT, SOURCE_HTML] = process.argv;
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const cheerio = require('cheerio');
const minifyHTML = require('html-minifier').minify;

const html = readFileSync(SOURCE_HTML).toString('utf8');

const $ = cheerio.load(html);
const title = $('meta[name="title"]').attr('content');
const author = $('meta[name="author"]').attr('content');

const gifFiles = $('img[src]').map((i, el) => $(el).attr('src')).toArray();

gifFiles.forEach((file, i) => {
    $(`img[src="${file}"]`)
        .removeAttr('src')
        .attr('recindex', (i + 1).toString().padStart(5, '0'));
});

const fileDate = Date.now();
const finalHTML = minifyHTML($.html(),{collapseWhitespace: true});
const finalHTMLFile = `out/${fileDate}.html`;
const finalMOBIFile = `out/${fileDate}.mobi`;

writeFileSync(finalHTMLFile, finalHTML);

execSync(`./MobiWriterPlus ${finalHTMLFile} ${finalMOBIFile} --title='${title}' --author='${author}' ${gifFiles.join(' ')}`);
