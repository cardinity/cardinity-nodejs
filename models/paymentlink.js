const Constraint = require("./constraint");
const validate = require("validate.js");

/**
 * Sets variables to create new payment link
 *
 * @param {object} vars Variables for request
 */
function PaymentLink(vars) {
    let constraint = new Constraint;
    this.errors = validate(vars, {
        amount: constraint.amount,
        currency: constraint.currency,
        description: constraint.paymentLink.description,
        country: constraint.paymentLink.country,
        expiration_date: constraint.paymentLink.expirationDate,
        multiple_use: constraint.boolean,
    });

    this.method = 'POST';
    this.trailing = '/paymentLinks';

    this.amount = vars.amount;
    this.currency = vars.currency;
    this.country = vars.country;
    this.description = vars.description;
    if (vars.expiration_date) {
        if (vars.expiration_date instanceof Date && !isNaN(vars.expiration_date)) {
            this.expiration_date = vars.expiration_date.toISOString();
        } else {
            this.expiration_date = vars.expiration_date;
        }
    }
    this.multiple_use = vars.multiple_use;
}

module.exports = PaymentLink;