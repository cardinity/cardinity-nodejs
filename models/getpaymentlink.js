const Constraint = require("./constraint");
const validate = require("validate.js");

/**
 * Sets variables to get payment link information
 *
 * @param {object} vars Variables for request
 */
function GetPaymentLink(vars) {
    let constraint = new Constraint;
    this.errors = validate(vars, {id: constraint.paymentId});

    this.method = 'GET';
    this.trailing = '/paymentLinks/' + vars.id;
}

module.exports = GetPaymentLink;