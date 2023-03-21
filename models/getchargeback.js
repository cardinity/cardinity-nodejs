const validate = require('validate.js');
const Constraint = require('./constraint.js');

/**
 * Sets variables to get chargeback information
 *
 * @param {object} vars Variables for request
 */
function GetChargeback(vars) {
    this.method = 'GET';
    if (Number.isInteger(vars) || !vars) {
        this.trailing = '/chargebacks';
        if (vars) {
            this.trailing += '?limit=' + vars;
        }
    } else {
        let constraint = new Constraint;
        let constraints = {payment_id: constraint.paymentId};
        if (vars.chargeback_id) {
            constraints.chargeback_id = constraint.paymentId;
        }
        this.errors = validate(vars, constraints);
        this.trailing = '/' + vars.payment_id + '/chargebacks/' + (vars.chargeback_id || '');
    }
}

module.exports = GetChargeback;