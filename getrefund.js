var method = GetRefund.prototype;

function GetRefund(vars) {
    if(vars.refund_id){
        this.method = 'GET'
        this.trailing = '/' + vars.id + '/refunds/' + vars.refund_id
    } else {
        this.method = 'GET'
        this.trailing = '/' + vars.id + '/refunds/'
    }
}

module.exports = GetRefund;