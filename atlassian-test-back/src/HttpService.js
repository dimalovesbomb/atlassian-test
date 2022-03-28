const https = require('https');

class HttpService {
    static requestGET(url, queryParams) {
        return new Promise((resolve, reject) => {
            let data = '';
            const URL = `${url}?${new URLSearchParams(queryParams)}`

            https.get(URL, res => {
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    data = JSON.parse(data);
                    resolve(data);
                })
            }).on('error', err => {
                console.log(err.message);
                reject('error in HttpService');
            })
                .end();
        })
    }
}

module.exports = HttpService;