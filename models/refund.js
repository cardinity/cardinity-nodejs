const method = Refund.prototype;

/**
 * Sets variables for a Refund request
 * @param {object} vars 
 */
function Refund(vars) {
    this.method = 'POST';
    this.amount = vars.amount;
    this.description = vars.description;
    this.trailing = '/payments/' + vars.id + '/refunds';
}

module.exports = Refund;