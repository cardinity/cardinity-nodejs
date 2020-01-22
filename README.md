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

...

var purchase = new Payment({
        "amount": parseFloat(req.body.price).toFixed(2),
        "currency": "EUR",
        "settle": false,
        "description": "Payment from NodeJS",
        "order_id": "NodeJS1",
        "country": "LT",
        "payment_instrument": {
            "pan": req.body.cardnumber,
            "exp_year": req.body.expyear,
            "exp_month": req.body.expmonth,
            "cvc": req.body.cvv,
            "holder": String(req.cardname),
        },
    })
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    client.call(purchase)
```

# Changelog

- 0.1.0 All API v1 methods are implemented
- 0.0.1 Basic payment function