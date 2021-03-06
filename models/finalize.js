const validate = require('validate.js');
const Constraint = require('./constraint.js');

const method = Finalize.prototype;

/**
 * Sets varaibles for a Finalize request
 * 
 * @param {object} vars Variables for reqest
 */
function Finalize(vars) {
    let constraint = new Constraint;

    this.method = 'PATCH';

    if (vars.threedsv2 == true) {
        this.cres = vars.cres;
        this.trailing = '/' + vars.id;
        constraints = {
            id: constraint.paymentId,
            cres: constraint.string
        }
    } else {
        this.trailing = '/' + vars.id;
        this.authorize_data = vars.authorize_data;
        constraints = {
            id: constraint.paymentId,
            authorize_data: constraint.string
        }
    }
    this.errors = validate(vars, constraints);
}
module.exports = Finalize;