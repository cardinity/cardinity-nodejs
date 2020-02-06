var method = Payment.prototype;

/**
 * Sets variables for a Payment request
 * @param {object} vars 
 */
function Payment(vars) {
    this.method = 'POST';
    this.amount = vars.amount;
    this.currency = vars.currency;
    this.settle = vars.settle;
    this.description = vars.description;
    this.order_id = vars.order_id;
    this.country = vars.country;
    this.payment_method = 'card';
    this.payment_instrument = vars.payment_instrument;
}

module.exports = Payment;