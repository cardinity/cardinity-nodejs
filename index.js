exports.printMsg = function() {
    console.log("This is a message from the Cardinity package");
  }

exports.pay = function() {
  var Client = require('./client.js')
  var Payment = require('./payment.js')

  var payment = new Payment({
    "amount": "50.00",
    "currency": "EUR",
    "settle": false,
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
  client.call(payment);
}