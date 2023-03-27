const method = Settle.prototype;

/**
 * Sets variables for a Settlement request
 * @param {object} vars 
 */
function Settle(vars) {
    this.method = 'POST';
    this.trailing = '/payments/' + vars.id + '/settlements';
    this.amount = vars.amount;
    this.description = vars.description;
}

module.exports = Settle;