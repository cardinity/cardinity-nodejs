exports.printMsg = function() {
    console.log("This is a message from the Cardinity package");
  }

exports.pay = function() {
  var Client = require('./client.js')
  var Payment = require('./payment.js')

  var samplePurchase = new Payment({
    "amount": "50.00",
    "currency": "EUR",
    "settle": true,
    "description": "some description",
    "order_id": "69420",
    "country": "LT",
    "payment_method": "card",
    "payment_instrument": {
        "pan": "5454545454545454",
        "exp_year": 2021,
        "exp_month": 11,
        "cvc": "999",
        "holder": "Mike Dough"
    }
})

  var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
  client.call(samplePurchase).then(function(response){
    console.log(response);
    if(response.status == 'pending'){
      console.log('need 3d secure')
    }
  });
}

exports.finalize = function() {
  var Client = require('./client.js')
  var Payment = require('./payment.js')

  var sampleFinalize = new Payment({
    "authorize_data": "3d-pass",

  })
  var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
  client.call(sampleFinalize, 'PATCH', '/d88fbfa9-37b5-4002-92b0-6cbf21269b2a').then(function(response){
    console.log(response);
  });
}

exports.recurring = function() {
  var Client = require('./client.js')
  var Payment = require('./payment.js')

  var sampleRecurring = new Payment({
    "amount": "50.00",
    "currency": "EUR",
    "settle": false,
    "description": "some description",
    "order_id": "69420",
    "country": "LT",
    "payment_method": "recurring",
    "payment_instrument": {
        "payment_id": "088c4755-897c-4cba-b702-bfdf9250dbaf"
    }
  })
  var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
  client.call(sampleRecurring).then(function(response){
    console.log(response);
  });
}