var method = GetPayments.prototype;

function GetPayments(vars) {
    this.cardinity_method = 'get_payments'
    this.method = 'GET'
    this.limit = vars.amount
}

module.exports = GetPayments;