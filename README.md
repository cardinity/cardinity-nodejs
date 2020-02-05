
# Cardinity NodeJS SDK

This is official NodeJS client library for [Cardinity's](https://developers.cardinity.com/api/v1/) API.  
Library includes all the functionality provided by API. Library was designed to be flexible and self-explanatory for developers to implement.

## Installation

```sh
npm install cardinity-nodejs
```

## API documentation

[https://developers.cardinity.com/api/v1/](https://developers.cardinity.com/api/v1/)

## Usage

### Authentication

```javascript
/**
* You don't have to bother about authentication.
* It is handled auto-magically behind the scenes.
* You just have to initialize the client object.
*/

var Client = require('cardinity-nodejs/client.js');
var client = new Client('YOUR_CONSUMER_KEY','YOUR_CONSUMER_SECRET');
```

### Payments

#### Create new payment

```javascript
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
var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(purchase).then(function(response){
    // Deal with response
}).catch(function(error){
    // Deal with error
});
```

#### Create new recurring payment

```javascript
var Client = require('cardinity-nodejs/client.js')
var Recurring = require('cardinity-nodejs/recurring.js')


var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var recurring = new Recurring({
    "amount": "50.00",
    "currency": "EUR",
    "settle": false,
    "description": "some description",
    "order_id": "12345678",
    "country": "LT",
    "payment_instrument": {
        "payment_id": "INITAL_PAYMENT_ID",
    },
})
client.call(recurring).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Finalize pending payment

```javascript
var Client = require('cardinity-nodejs/client.js')
var Finalize = require('cardinity-nodejs/finalize.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var patch = new Finalize({
    "authorize_data": 'PARES_RECEIVED_FROM_ACS',
    "id": 'PENDING_PAYMENT_UUID',
})
client.call(patch).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing payment

```javascript
    var Client = require('cardinity-nodejs/client.js')
    var GetPayment = require('cardinity-nodejs/getpayment.js')
    var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    var payments = new GetPayment({
        "id": "PAYMENT_UUID",
    })
    client.call(payments).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
```

#### Get all payments

```javascript
var Client = require('cardinity-nodejs/client.js')
var GetPayment = require('cardinity-nodejs/getpayment.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var payments = new GetPayment(NUMBER_OF_PAYMENTS_TO_GET)
client.call(payments).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Refunds

#### Create new refund

```javascript
var Client = require('cardinity-nodejs/client.js')
var Refund = require('cardinity-nodejs/refund.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var refund = new Refund({
    "amount": "50.00",
    "description": "some optional description",
    "id": 'PAYMENT_UUID',
})
client.call(refund).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing refund

```javascript
var Client = require('cardinity-nodejs/client.js')
var GetRefund = require('cardinity-nodejs/getrefund')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var refunds = new GetRefund({
    "id": "PAYMENT_UUID",
    "refund_id": "REFUND_UUID"
})
client.call(refunds).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all refunds

```javascript
var Client = require('cardinity-nodejs/client.js')
var GetRefund = require('cardinity-nodejs/getrefund')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var refund = new GetRefund({
    "id": "PAYMENT_UUID"
})
client.call(refund).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Settlements

#### Create new settlement

```javascript
var Client = require('cardinity-nodejs/client.js')
var Settlement = require('cardinity-nodejs/settlement.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var settle = new Settlement({
    "id": "PAYMENT_UUID",
    "amount": "50.00",
    "description": "optional description"
})
client.call(settle).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing settlement

```javascript
var Client = require('cardinity-nodejs/client.js')
var GetSettlement = require('cardinity-nodejs/getsettlement.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var settle = new GetSettlement({
    "id": "PAYMENT_UUID",
    "settlement_id": "SETTLEMENT_UUID"
})
client.call(settle).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all settlements

```javascript
var Client = require('cardinity-nodejs/client.js')
var GetSettlement = require('cardinity-nodejs/getsettlement.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var settle = new GetSettlement({
    "id": "PAYMENT_UUID"
})
client.call(settle).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Voids

#### Create new void

```javascript
var Client = require('cardinity-nodejs/client.js')
var Voids = require('cardinity-nodejs/voids.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var voids = new Voids({
    "id": "PAYMENT_UUID",
})
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing void

```javascript
var Client = require('./client.js')
var GetVoids = require('./getvoids.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var voids = new GetVoids({
    "id": "PAYMENT_UUID",
    "void_id": "VOID_UUID"
})
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all voids

```javascript
var Client = require('./client.js')
var GetVoids = require('./getvoids.js')

var client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
var voids = new GetVoids({
    "id": "PAYMENT_UUID"
})
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Changelog

- 0.1.5 Updated README
- 0.1.0 All API v1 methods are implemented
- 0.0.1 Basic payment function
