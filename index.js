const https = require("https");

class hastebin {

    /**
     * Initiate client.
     * @param {Object} config Client config
     * @param {string} [config.server] HasteBin server (defaults to https://hastebin.com/)
     * @returns {null}
     */
    constructor(config) {
        this.server = (config || {}).server || "https://hastebin.com/";
        if (!this.server.endsWith("/")) this.server = `${this.server}/`;

        this.base = this.server.split("//")[1];
        this.base = this.base.substring(0, this.base.length - 1);
    };

    /**
     * Read a haste.
     * @param {string} key Haste key
     * @returns {Promise.<String>} Haste data (content)
     */
    read(key) {
        return new Promise((promiseRes, promiseRej) => {
            if (!key) promiseRej("Argument 1 missing or null.");

            https.get(`${this.server}documents/${key}`, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    const json = JSON.parse(data);

                    if (res.statusCode === 200) {
                        promiseRes(json.data);
                    } else if (res.statusCode === 404) {
                        promiseRej(`${json.message} (${res.statusCode})`);
                    } else {
                        promiseRej(`${res.statusMessage} (${res.statusCode})`);
                    };
                });
            });
        });
    };

    /**
     * Create/write a haste.
     * @param {string} text Haste data (content)
     * @returns {Promise.<String>} Haste key
     */
    write(text) {
        return new Promise((promiseRes, promiseRej) => {
            if (!text) promiseRej("Argument 1 missing or null.");

            const req = https.request({
                "hostname": this.base,
                "path": "/documents",
                "headers": {
                    "Content-Type": "text/plain",
                    "Content-Length": text.length
                },
                "method": "POST"
            }, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    const json = JSON.parse(data);

                    promiseRes(json.key);
                });
            });

            req.write(text);
            req.end();
        });
    };

};

module.exports = hastebin;