var validate = require('validate.js');
var Constraint = require('constraint');

var method = Recurring.prototype;

/**
 * Sets variables for a Recurring Payment request
 * @param {object} vars 
 */
function Recurring(vars) {
	let constraint = new Constraint;
    let constraints = {
        amount: constraint.amount,
        currency: constraint.currency,
        settle: constraint.settle,
        description: constraint.description,
        order_id: constraint.orderId,
        country: constraint.country
    }
    this.errors = validate(vars, constraints);
    
    this.method = 'POST';
    this.amount = vars.amount;
    this.currency = vars.currency;
    this.settle = vars.settle;
    this.description = vars.description;
    this.order_id = vars.order_id;
    this.country = vars.country;
    this.payment_method = 'recurring';
    this.payment_instrument = vars.payment_instrument;
}

module.exports = Recurring;