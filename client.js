var method = Client.prototype;

function Client(consumerKey, consumerSecret) {
    this.consumerKey = consumerKey
    this.consumerSecret = consumerSecret
}

method.call = function(payment) {
    const request = require('request')
    const OAuth = require('oauth-1.0a')
    const crypto = require('crypto')
    // Initialize
    const oauth = OAuth({
        consumer: {
            key: this.consumerKey,
            secret: this.consumerSecret,
        },
        signature_method: 'HMAC-SHA1',
        
        hash_function(base_string, secret) {
            return crypto
                .createHmac('sha1', secret)
                .update(base_string)
                .digest('base64')
        },
    })
    const request_data = {
        url: 'https://api.cardinity.com/v1/payments',
        method: 'POST',
    }    
    request(
        {
            url: request_data.url,
            method: request_data.method,
            headers: oauth.mergeObject({'Accept': 'application/json', 'Content-Type': 'application/json'}, oauth.toHeader(oauth.authorize(request_data))),
            body: JSON.stringify(payment)
        },
        function(error, response, body) {
            console.log(body)
        }
    )
}

module.exports = Client;