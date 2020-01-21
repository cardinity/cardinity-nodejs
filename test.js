var Client = require('./client.js')
var Payment = require('./payment.js')
var Finalize = require('./finalize.js')
var Recurring = require('./recurring.js')

const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})
app.post('/pay', function (req, res) {
  var purchase = new Payment({
      "amount": parseFloat(req.body.price).toFixed(2),
      "currency": "EUR",
      "settle": true,
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
  client.call(purchase).then(function(response){
    if(response.status == 'pending'){
        res.render('pay', {pareq: response.authorization_information.data, url: response.authorization_information.url, callback_url: 'http://localhost:3000/callback', md: response.id});
    }
  });
})

app.post('/callback', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var patch = new Finalize({
        "authorize_data": req.body.PaRes
    })
    client.call(patch, 'PATCH', '/' + req.body.MD).then(function(response){
        res.render('done');
    });
})

app.get('/recurring', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var recurring = new Recurring({
        "amount": "5.00",
        "currency": "EUR",
        "settle": true,
        "description": "Payment from NodeJS",
        "order_id": "NodeJS1",
        "country": "LT",
        "payment_instrument": {
            "payment_id": "",
        },
    })
    client.call(recurring).then(function(response){
        console.log(response)
        res.render('done')
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})