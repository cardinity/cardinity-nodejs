const validate = require('validate.js');
const Constraint = require('./constraint.js');

/**
 * Sets variables to update existing payment link
 *
 * @param {object} vars Variables for request
 */
function UpdatePaymentLink(vars) {
    let constraint = new Constraint;
    this.errors = validate(vars, {
        id: constraint.paymentId,
        expiration_date: constraint.paymentLink.expirationDate,
        enabled: constraint.boolean
    });

    this.method = 'PATCH';
    this.trailing = '/paymentLinks/' + vars.id;

    if (vars.expiration_date) {
        if (vars.expiration_date instanceof Date && !isNaN(vars.expiration_date)) {
            this.expiration_date = vars.expiration_date.toISOString();
        } else {
            this.expiration_date = vars.expiration_date;
        }
    }
    this.enabled = vars.enabled;
}

module.exports = UpdatePaymentLink;