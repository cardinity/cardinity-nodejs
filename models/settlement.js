const method = Settle.prototype;

/**
 * Sets variables for a Settlement request
 * @param {object} vars 
 */
function Settle(vars) {
    this.method = 'POST';
    this.trailing = '/' + vars.id + '/settlements';
    this.amount = vars.amount;
    this.description = vars.description;
}

module.exports = Settle;