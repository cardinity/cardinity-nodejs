
# Cardinity NodeJS Wrapper

This is an official NodeJS client library for [Cardinity's](https://developers.cardinity.com/api/v1/) API.  
Library includes all the functionality provided by the API. Library was designed to be flexible and self-explanatory for developers to implement.

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

const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const client = new Client('YOUR_CONSUMER_KEY','YOUR_CONSUMER_SECRET');
```

### Payments

#### Create new payment

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Payment = Cardinity.payment()

const purchase = new Payment({
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

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(purchase).then(function(response){
    // Deal with response
}).catch(function(error){
    // Deal with error
});
```

#### Create new recurring payment

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Recurring = Cardinity.recurring()

const recurring = new Recurring({
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

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(recurring).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Finalize pending payment

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Finalize = Cardinity.finalize()

const patch = new Finalize({
    "authorize_data": 'PARES_RECEIVED_FROM_ACS',
    "id": 'PENDING_PAYMENT_UUID',
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(patch).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing payment

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetPayment = Cardinity.getPayment()

const payments = new GetPayment({
    "id": "PAYMENT_UUID",
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(payments).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all payments

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetPayment = Cardinity.getPayment()

const payments = new GetPayment(NUMBER_OF_PAYMENTS_TO_GET)

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(payments).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Refunds

#### Create new refund

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Refund = Cardinity.refund()

const refund = new Refund({
    "amount": "50.00",
    "description": "some optional description",
    "id": 'PAYMENT_UUID',
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(refund).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing refund

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetRefund = Cardinity.getRefund()

const refunds = new GetRefund({
    "id": "PAYMENT_UUID",
    "refund_id": "REFUND_UUID"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(refunds).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all refunds

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetRefund = Cardinity.getRefund()

const refund = new GetRefund({
    "id": "PAYMENT_UUID"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(refund).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Settlements

#### Create new settlement

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Settlement = Cardinity.settlement()

const settle = new Settlement({
    "id": "PAYMENT_UUID",
    "amount": "50.00",
    "description": "optional description"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(settle).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing settlement

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetSettlement = Cardinity.getSettlement()

const settle = new GetSettlement({
    "id": "PAYMENT_UUID",
    "settlement_id": "SETTLEMENT_UUID"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(settle).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all settlements

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetSettlement = Cardinity.getSettlement()

const settle = new GetSettlement({
    "id": "PAYMENT_UUID"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(settle).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

### Voids

#### Create new void

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Voids = Cardinity.voids()

const voids = new Voids({
    "id": "PAYMENT_UUID",
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get existing void

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetVoids = Cardinity.getVoids();

const voids = new GetVoids({
    "id": "PAYMENT_UUID",
    "void_id": "VOID_UUID"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```

#### Get all voids

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetVoids = Cardinity.getVoids();

const voids = new GetVoids({
    "id": "PAYMENT_UUID"
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```
