var Client = require('./client.js')
var Payment = require('./payment.js')
var Finalize = require('./finalize.js')
var Recurring = require('./recurring.js')
var Refund = require('./refund.js')
var GetPayments = require('./getpayment.js')
var GetRefund = require('./getrefund')
var Settlement = require('./settlement.js')
var GetSettlement = require('./getsettlement.js')
var Voids = require('./voids.js')
var GetVoids = require('./getvoids.js')

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
    client.call(purchase).then(function(response){
        if(response.status == 'pending'){
            res.render('pay', {pareq: response.authorization_information.data, url: response.authorization_information.url, callback_url: 'http://localhost:3000/callback', md: response.id});
        }
    }).catch(function (error){
        console.log(error)
    });
})

app.post('/callback', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var patch = new Finalize({
        "authorize_data": req.body.PaRes,
        "trailing": '/' + req.body.MD,
    })
    client.call(patch).then(function(response){
        res.render('done');
    }).catch(function (error){
        console.log(error)
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
            "payment_id": "69ea333c-9b51-4553-b3e8-bc64223664cc",
        },
    })
    client.call(recurring).then(function(response){
        console.log(response)
        res.render('done')
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/refund', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var refund = new Refund({
        "amount": "2.00",
        "description": "NodeJS test refund",
        "id": '69ea333c-9b51-4553-b3e8-bc64223664cc',
    })
    client.call(refund).then(function(response){
        console.log(response)
        res.render('done')
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/all-payments', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var payments = new GetPayments(parseInt(req.query.limit));
    client.call(payments).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/payment', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var payments = new GetPayments({
        "id": req.query.id,
    })
    client.call(payments).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/all-refunds', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var refunds = new GetRefund({
        "id": "69ea333c-9b51-4553-b3e8-bc64223664cc"
    })
    client.call(refunds).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/get-refund', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var refunds = new GetRefund({
        "id": "69ea333c-9b51-4553-b3e8-bc64223664cc",
        "refund_id": "69ea333c-9b51-4553-b3e8-bc64223664cc"
    })
    client.call(refunds).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/settle', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var settle = new Settlement({
        "id": "220f5b46-dea6-4925-a578-b944cbb6298b",
        "amount": "2.00",
    })
    client.call(settle).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/get-settlement', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var settle = new GetSettlement({
        "id": "220f5b46-dea6-4925-a578-b944cbb6298b",
        "settlement_id": "3bbe5f7a-b7f8-47f4-86ef-ec9e59d44d77"
    })
    client.call(settle).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/voids', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var voids = new Voids({
        "id": "1f77737e-0044-44f8-bfd1-2a4aa79431ee",
    })
    client.call(voids).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.get('/get-voids', function(req, res){
    var client = new Client('test_3a4393c3da1a4e316ee66c0cc61c71', 'ffe1372c074185b19c309964812bb8f3f2256ba514aea8a318')
    var voids = new GetVoids({
        "id": "1f77737e-0044-44f8-bfd1-2a4aa79431ee",
        // "void_id": "b884831b-de60-4d32-b690-af88d746bad9"
    })
    client.call(voids).then(function(response){
        console.log(response)
        res.render('payments', {payments: JSON.stringify(response)})
    }).catch(function (error){
        console.log(error)
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})