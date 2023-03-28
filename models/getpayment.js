const method = GetPayment.prototype;

/**
 * Sets variables to get payment information
 * 
 * @param {object} vars Variables for request
 */
function GetPayment(vars) {
    this.method = 'GET';
    if(Number.isInteger(vars)){
        this.trailing = '/payments?limit=' + vars;
    } else {
        this.trailing = '/payments/' + vars.id;
    }
}

module.exports = GetPayment;