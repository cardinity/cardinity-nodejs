
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
    'amount': '50.00',
    'currency': 'EUR',
    'settle': true,
    'description': 'Payment from NodeJS',
    'order_id': 'NodeJS1',
    'country': 'LT',
    'payment_method': 'card',
    'payment_instrument': {
        'pan': '5555555555554444',
        'exp_year': 2022,
        'exp_month': 2,
        'cvc': '222',
        'holder': 'John Doe',
    },
    'threeds2_data': {
        'notification_url': 'http://localhost:3000',
        'browser_info': {
            'accept_header': 'Some header',
            'browser_language': 'en',
            'screen_width': 390,
            'screen_height': 400,
            'challenge_window_size': '390x400',
            'user_agent': 'super user agent',
            'color_depth': 24,
            'time_zone': -60,
            'ip_address': '192.168.0.1',
            'javascript_enabled': true,
            'java_enabled': false
        }
    }
});
// check if there is any data validation errors.
if (purchase.errors) {
    // show errors or print errors to logs here.
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(purchase).then(function(response){
        if (response.status == 'approved') {
            // handle approved payment
        } else if (response.status == 'pending') {
            // handle 3D secure flow
            if (response.authorization_information) {
                var form_url = response.authorization_information.url;
                var inputs = '<input type="hidden" name="PaReq" value="'+
                    response.authorization_information.data +'" />'+
                    '<input type="hidden" name="TermUrl" value="http://localhost:3000" />';
                var threed_key = 'MD';
            } else if (response.threeds2_data) {
                var form_url = response.threeds2_data.acs_url;
                var inputs = '<input name="creq" value="'+ response.threeds2_data.creq +'" />';
                var threed_key = 'threeDSSessionData';
            }
            res.setHeader('Content-Type', 'text/html');
            form = '<html><head>'+
                '<title>3-D Secure Example</title>'+
                '<script type="text/javascript">'+
                +'function OnLoadEvent(){'+
                    // Make the form post as soon as it has been loaded.
                    +'document.ThreeDForm.submit();'+
                +'}'+
                '</script>'+
                '</head>'+
                '<body onload="OnLoadEvent();">'+
                '<form name="ThreeDForm" method="POST" action="'+ form_url +'">'+
                    '<button type=submit>Click Here</button>'+
                    inputs +
                    '<input type="hidden" name="'+ threed_key +'" value="'+ 
                        response.id +'" />'+
                '</form>'+
                '</body></html>';
            res.end(form);
        } else {
            res.setHeader('Content-Type', 'text/plain')
            res.end(JSON.stringify(response, null, 2))
        }
    }).catch(function(error){
        // Deal with error
    });
}
```

#### Create new recurring payment

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Recurring = Cardinity.recurring()

const recurring = new Recurring({
    'amount': 50.00,
    'currency': 'EUR',
    'settle': false,
    'description': 'some description',
    'order_id': '12345678',
    'country': 'LT',
    'payment_instrument': {
        'payment_id': 'INITAL_PAYMENT_ID',
    },
})

if (recurring.errors) {
    // show errors or print errors to logs here.
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(recurring).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Finalize pending payment 3D secure V2

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Finalize = Cardinity.finalize()

const patch = new Finalize({
    'id': 'PENDING_PAYMENT_UUID',
    'cres': 'CRES_RECEIVED_FROM_ACS',
    'threedsv2': true // flag for 3D secure V2
});

if (patch.errors) {
    // show errors or print errors to logs here.
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(patch).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Finalize pending payment 3D secure V1

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const Finalize = Cardinity.finalize()

const patch = new Finalize({
    'authorize_data': 'PARES_RECEIVED_FROM_ACS',
    'id': 'PENDING_PAYMENT_UUID',
})

if (patch.errors) {
    // show errors or print errors to logs here.
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(patch).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Finalize processing 3D secure v2 and in case of missing parameters v1
This example suppose Express package is used: `const app = express()`:
```javascript
app.get('/callback', (req, res) => {
    /** If a technical error occured during payment finalization, Cardinity will try to perform 3D Secure V1 authorization.
     * You can either retry 3D Secure V2 flow, or perform 3D Secure V1 flow
     */
    if (req.body.PaRes) {
        // finalize 3dsv1 if `PaRes` parameter is received
        var finalize_obj = new Finalize({
        'id': req.body.MD,
        'authorize_data': req.body.PaRes
    })
    } else if (req.body.cres) {
        // finalize 3dsv1 if `cres` parameter is received
        var finalize_obj = new Finalize({
            'id': req.body.threeDSSessionData,
            'cres': req.body.cres,
            'threedsv2': true
        });
    }
    if (finalize_obj.errors) {
        // show errors if exist
        res.end(JSON.stringify(finalize_obj.errors, null, 2));
    } else {
        client.call(finalize_obj).then(function (response) {
            // if finalize 3D secure v2 failed 'pending' status is returned.
            if (response.status == 'pending') {
            // process through 3D secure v1 flow starting with form.
            form = '<html><head>'+
            '<title>3-D Secure V1 Example</title>'+
            '<script type="text/javascript">'+
                +'function OnLoadEvent(){'+
                // Make the form post as soon as it has been loaded.
                +'document.ThreeDForm.submit();'+
                +'}'+
            '</script>'+
            '</head>'+
            '<body onload="OnLoadEvent();">'+
                '<form name="ThreeDForm" method="POST" action="'+ response.authorization_information.url +'">'+
                '<button type=submit>Click Here</button>'+
                '<input type="hidden" name="PaReq" value="'+ response.authorization_information.data +'" />'+
                '<input type="hidden" name="TermUrl" value="http://localhost:3000" />'+
                '<input type="hidden" name="MD" value="'+ response.id +'" />'+
                '</form>'+
            '</body></html>';
            res.end(form);
            } else if (response.status == 'approved')  {
                // handle successfully finished payment.
            }
        }).catch(function (error) {
            // show errors if exist
            res.end(JSON.stringify(error, null, 2));
        });
    }
})
```

#### Get existing payment

```javascript
const Cardinity = require('cardinity-nodejs')
const Client = Cardinity.client()
const GetPayment = Cardinity.getPayment()

const payments = new GetPayment({
    'id': 'PAYMENT_UUID',
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
    'amount': '50.00',
    'description': 'some optional description',
    'id': 'PAYMENT_UUID',
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
    'id': 'PAYMENT_UUID',
    'refund_id': 'REFUND_UUID'
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
    'id': 'PAYMENT_UUID'
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
    'id': 'PAYMENT_UUID',
    'amount': '50.00',
    'description': 'optional description'
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
    'id': 'PAYMENT_UUID',
    'settlement_id': 'SETTLEMENT_UUID'
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
    'id': 'PAYMENT_UUID'
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
    'id': 'PAYMENT_UUID',
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
    'id': 'PAYMENT_UUID',
    'void_id': 'VOID_UUID'
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
    'id': 'PAYMENT_UUID'
})

const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
client.call(voids).then(function(response){
    // Deal with response
}).catch(function (error){
    // Deal with error
});
```
## Change log

### Added
- Added validator package for validating `Payment` and `Recurring` and `Finalize` objects.
- Added `Constraint` class to create constraints for `Payment` and `Recurring` and `Finalize` objects.
- Added `constraint` parameters inside `Payment` and `Recurring` and `Finalize` methods.