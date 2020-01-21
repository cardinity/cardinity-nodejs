var method = GetPayment.prototype;

function GetPayment(vars) {
    if(Number.isInteger(vars)){
        this.method = 'GET'
        this.trailing = '?limit=' + vars 
    } else {
        this.method = 'GET'
        this.trailing = '/' + vars.id
    }
}

module.exports = GetPayment;