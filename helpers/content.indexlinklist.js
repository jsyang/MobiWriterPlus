const slugify = require('slugify');
const SLUGIFY_PARAMS = { lower: true, strict: true };

function makeIndexLinkList(input) {
    const listHTML = input.split('\n').filter(Boolean).map(line => {
        const label = line.trim();
        const slug = slugify(label, SLUGIFY_PARAMS);
        return `<li><a href="#${slug}">${label}</a></li>`;
    }).join('\n');

    return `<ul>\n${listHTML}\n</ul>`;
};


const TAG_INDEX_LINK_LIST = '%indexlinklist';

function interpolate(html) {
    const $ = cheerio.load(html);
    $('*').contents().filter(function () {
        // Abort if not a comment DOM node
        if (this.nodeType !== 8) return;

        const nodeValue = this.nodeValue.trim();
        if (!nodeValue.startsWith(TAG_INDEX_LINK_LIST)) return;

        const listText = nodeValue.substring(nodeValue.indexOf(TAG_INDEX_LINK_LIST) + TAG_INDEX_LINK_LIST.length);
        const listHTML = makeIndexLinkList(listText);

        $(listHTML).insertAfter(this);
    });

    return $.html();
}

module.exports = {
    interpolate,
};
