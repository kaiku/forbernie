const routes = {
    'donate': {
        url: 'https://secure.actblue.com/donate/bernie.sanders.2020?refcode={host}',
        description: 'Official Bernie Sanders 2020 donation page',
    },
};

module.exports.getUrl = function(subdomain, { host, domain }) {
    const entry = routes[subdomain];
    const url = typeof entry === 'undefined' ? '' : entry.url;
    if (url) {
        return url.replace('{host}', host).replace('{domain}', domain); 
    } else {
        return '';
    }
}