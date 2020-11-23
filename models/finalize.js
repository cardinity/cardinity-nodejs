var validate = require('validate.js');
var Constraint = require('./constraint.js');

var method = Finalize.prototype;

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
        this.trailing = '/' + vars.threeDsSessionData;
        constraints = {
            cres: constraint.string,
            threeDsSessionData: constraint.string
        }
    } else {
        this.trailing = '/' + vars.id;
        this.authorize_data = vars.authorize_data;
        constraints = {
            id: constraint.orderId,
            authorize_data: constraint.string
        }
    }
    if (!constraints) throw new Error('missing parameters');
    console.log('Finalize constraints:');console.log(constraints);
    this.errors = validate(vars, constraints);
}
module.exports = Finalize;