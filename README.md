# Cardinity NodeJS Wrapper

This is an official NodeJS client library for [Cardinity's](https://developers.cardinity.com/api/v1/) API.  
Library includes all the functionality provided by the API. Library was designed to be flexible and self-explanatory for developers to implement.

### Table of Contents  
[<b>Installation →</b>](#installation)<br>
[<b>Usage →</b>](#Usage)   
      [Payments](#payments)   
      [Refunds](#refunds)  
      [Settlements](#settlements)  
      [Voids](#voids)             
      [Chargebacks](#chargebacks)             
      [Payment Links](#payment-links)             
 [<b>Having problems? →</b>](#having-problems)<br>
 [<b>About us →</b>](#-aboutus)<br>     
<a name="headers"/>  

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
        'notification_url': 'https://www.myonlineshop.com/callback/3dsv2',
        'browser_info': {
            'accept_header': 'text/html',
            'browser_language': 'en-US',
            'screen_width': 1920,
            'screen_height': 1040,
            'challenge_window_size': '500x600',
            'user_agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:21.0) Gecko/20100101 Firefox/21.0',
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
    'amount': '50.00',
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

### Chargebacks

#### Get chargebacks of a payment

```javascript
const Cardinity = require('cardinity-nodejs')
const GetChargeback = Cardinity.getChargeback()

const getChargeback = new GetChargeback({
    'payment_id': 'PAYMENT_UUID'
})

if (getChargeback.errors) {
    // Deal with validation errors
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(getChargeback).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Get specific chargeback of a payment

```javascript
const Cardinity = require('cardinity-nodejs')
const GetChargeback = Cardinity.getChargeback()

const getChargeback = new GetChargeback({
    'payment_id': 'PAYMENT_UUID',
    'chargeback_id': 'CHARGEBACK_UUID'
})

if (getChargeback.errors) {
    // Deal with validation errors
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(getChargeback).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Get all chargebacks

```javascript
const Cardinity = require('cardinity-nodejs')
const GetChargeback = Cardinity.getChargeback()

const limit = 10
const getChargeback = new GetChargeback(limit)

if (getChargeback.errors) {
    // Deal with validation errors
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(getChargeback).then(function (response) {
        // Deal with response
    }).catch(function (error) {
        // Deal with error
    });
}
```

### Payment Links

#### Create new payment link

```javascript
const Cardinity = require('cardinity-nodejs')
const PaymentLink = Cardinity.paymentLink()

const now = new Date()
const paymentLink = new PaymentLink({
    'amount': '50.00',
    'currency': 'EUR',
    'description': 'PAYMENT_LINK_DESCRIPTION',
    'country': 'LT',
    'expiration_date': new Date(now.setDate(now.getDate() + 7)),//Expires 1 week from now
    'multiple_use': true
})

if (paymentLink.errors) {
    // Deal with validation errors
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(paymentLink).then(function(response){   
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Update existing payment link

```javascript
const Cardinity = require('cardinity-nodejs')
const UpdatePaymentLink = Cardinity.updatePaymentLink()

const now = new Date()
const updatePaymentLink = new UpdatePaymentLink({
    'id': 'PAYMENT_LINK_UUID',
    'expiration_date': new Date(now.setDate(now.getDate() + 7)),//Expires 1 week from now
    'enabled': true
})

if (updatePaymentLink.errors) {
    // Deal with validation errors
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(updatePaymentLink).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

#### Get existing payment link

```javascript
const Cardinity = require('cardinity-nodejs')
const GetPaymentLink = Cardinity.getPaymentLink()

const getPaymentLink = new GetPaymentLink({
    'id': 'PAYMENT_LINK_UUID'
})

if (getPaymentLink.errors) {
    // Deal with validation errors
} else {
    const client = new Client('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET')
    client.call(getPaymentLink).then(function(response){
        // Deal with response
    }).catch(function (error){
        // Deal with error
    });
}
```

### Having problems?  

Feel free to contact us regarding any problems that occurred during integration via info@cardinity.com. We will be more than happy to help.

-----

### ► About us
Cardinity is a licensed payment institution, active in the European Union, registered on VISA Europe and MasterCard International associations to provide <b>e-commerce credit card processing services</b> for online merchants. We operate not only as a <u>payment gateway</u> but also as an <u>acquiring Bank</u>. With over 10 years of experience in providing reliable online payment services, we continue to grow and improve as a perfect payment service solution for your businesses. Cardinity is certified as PCI-DSS level 1 payment service provider and always assures a secure environment for transactions. We assure a safe and cost-effective, all-in-one online payment solution for e-commerce businesses and sole proprietorships.<br>
#### Our features
• Fast application and boarding procedure.   
• Global payments - accept payments in major currencies with credit and debit cards from customers all around the world.   
• Recurring billing for subscription or membership based sales.  
• One-click payments - let your customers purchase with a single click.   
• Mobile payments. Purchases made anywhere on any mobile device.   
• Payment gateway and free merchant account.   
• PCI DSS level 1 compliance and assured security with our enhanced protection measures.   
• Simple and transparent pricing model. Only pay per transaction and receive all the features for free.
### Get started
<a href="https://cardinity.com/sign-up">Click here</a> to sign-up and start accepting credit and debit card payments on your website or <a href="https://cardinity.com/company/contact-us">here</a> to contact us 
#### Keywords
payment gateway, credit card payment, online payment, credit card processing, online payment gateway, cardinity for NodeJS.     

  
 [▲ back to top](#Cardinity-NodeJS-Wrapper)
