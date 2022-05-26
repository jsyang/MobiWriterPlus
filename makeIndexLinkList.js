const slugify = require('slugify');
const SLUGIFY_PARAMS = { lower: true, strict: true };

module.exports = input => {
    const listHTML = input.split('\n').filter(Boolean).map(line => {
        const label = line.trim();
        const slug = slugify(label, SLUGIFY_PARAMS);
        return `<li><a href="#${slug}">${label}</a></li>`;
    }).join('\n');

    return `<ul>\n${listHTML}\n</ul>`;
};
