var method = Payment.prototype;

function Payment(vars) {
    this.authorize_data = vars.authorize_data
}

module.exports = Payment;