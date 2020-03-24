var method = Client.prototype;

/**
 * Sets consumer key and consumer secret
 * 
 * @param {string} consumerKey 
 * @param {string} consumerSecret 
 */

function Client(consumerKey, consumerSecret) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
}

/**
 * Sends request to Cardinity Payments API
 * 
 * @param {object} body Variables for request (method, payment information)
 * @return {object} Response from server
 */

method.call = async function(body) {
    // For asynchronous request
    const requestPromise = require('request-promise');
    // For authorization to server
    const OAuth = require('oauth-1.0a');
    const crypto = require('crypto');
    // Initialize OAuth
    const oauth = OAuth({
        consumer: {
            key: this.consumerKey,
            secret: this.consumerSecret,
        },
        signature_method: 'HMAC-SHA1',
        // Hash the request
        hash_function(base_string, secret) {
            return crypto
                .createHmac('sha1', secret)
                .update(base_string)
                .digest('base64');
        },
    })
    const request_data = {
        url: 'https://api.cardinity.com/v1/payments' + (body.trailing || ''),
        method: body.method,
    }
    return await requestPromise(
        {
            url: request_data.url,
            method: request_data.method,
            headers: oauth.mergeObject({'Accept': 'application/json', 'Content-Type': 'application/json'}, oauth.toHeader(oauth.authorize(request_data))),
            body: JSON.stringify(body),
        }
    ).then(function (body){
        return JSON.parse(body);
    }).catch(function (error){
        return JSON.parse(error.error);
    })
}


module.exports = Client;