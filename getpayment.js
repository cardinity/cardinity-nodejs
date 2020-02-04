var method = GetPayment.prototype;

function GetPayment(vars) {
    this.method = 'GET';
    if(Number.isInteger(vars)){
        this.trailing = '?limit=' + vars;
    } else {
        this.trailing = '/' + vars.id;
    }
}

module.exports = GetPayment;