'use strict';

const routes = require('routes');

module.exports.redirect = (event, context, callback) => {
    const host = event.Records[0].cf.request.headers.host[0].value;
    const hostParts = host.split('.');
    const domain = hostParts.slice(-2).join('.');
    const subdomain = hostParts.slice(0, -2).join('.');
    const redirectUrl = routes.getUrl(subdomain, { host, domain });
    let response;
    
    if (redirectUrl) {
        response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: redirectUrl,
                }],
            },
        };
    } else {
        response = {
            status: '404',
            statusDescription: 'Not Found',
        };
    }

    callback(null, response);
};
