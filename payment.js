var method = Payment.prototype;

function Payment(vars) {
    this.amount = vars.amount
    this.currency = vars.currency
    this.settle = vars.settle
    this.description = vars.description
    this.order_id = vars.order_id
    this.country = vars.country
    this.payment_method = vars.payment_method
    this.payment_instrument = vars.payment_instrument
}

module.exports = Payment;