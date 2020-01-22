# Cardinity NodeJS SDK
This is official NodeJS client library for [Cardinity's](https://developers.cardinity.com/api/v1/) API.  
Library includes all the functionality provided by API. Library was designed to be flexible and self-explanatory for developers to implement.

## Installation

```sh
npm install cardinity-nodejs
```

## Test

```sh
node test.js
```


## Usage

#### Create new payment

```js
var Client = require('cardinity-nodejs/client.js')
var Payment = require('cardinity-nodejs/payment.js')

var purchase = new Payment({
        "amount": "50.00",
        "currency": "EUR",
        "settle": true,
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

#### Get existing payment
```js
    var client = new Client('consumerKey', 'consumerSecret')
    var payments = new GetPayments({
        "id": "{UUID}",
    })
    client.call(payments).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
```

## API documentation
[https://developers.cardinity.com/api/v1/](https://developers.cardinity.com/api/v1/)

# Changelog

- 0.1.5 Updated README
- 0.1.0 All API v1 methods are implemented
- 0.0.1 Basic payment function