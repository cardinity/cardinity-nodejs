# Cardinity NodeJS SDK


## Installation

```sh
npm install cardinity-nodejs
```

## Test

```sh
node test.js
```


## Usage

```js
var Client = require('./client.js')
var Payment = require('./payment.js')

var purchase = new Payment({
        "amount": "50.00",
        "currency": "EUR",
        "settle": false,
        "description": "Payment from NodeJS",
        "order_id": "NodeJS1",
        "country": "LT",
        "payment_instrument": {
            "pan": "5555555555554444",
            "exp_year": "2222",
            "exp_month": "2",
            "cvc": "222",
            "holder": "John Doe",
        },
    })
    var client = new Client('consumerKey', 'consumerSecret')
    client.call(purchase).then(function(response){
        // Deal with response
    }).catch(function(error){
        // Deal with error
    });
```

# Changelog

- 0.1.0 All API v1 methods are implemented
- 0.0.1 Basic payment function