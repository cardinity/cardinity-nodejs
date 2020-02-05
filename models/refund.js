var method = Refund.prototype;

function Refund(vars) {
    this.method = 'POST';
    this.amount = vars.amount;
    this.description = vars.description;
    this.trailing = '/' + vars.id + '/refunds';
}

module.exports = Refund;