const method = GetPayment.prototype;

/**
 * Sets varaibles to get payment information
 * 
 * @param {object} vars Variables for reqest
 */
function GetPayment(vars) {
    this.method = 'GET';
    if(Number.isInteger(vars)){
        this.trailing = '?limit=' + vars;
    } else {
        this.trailing = '/' + vars.id;
    }
}

module.exports = GetPayment;