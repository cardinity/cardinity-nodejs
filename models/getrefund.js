var method = GetRefund.prototype;

/**
 * Sets varaibles to get refund information
 * 
 * @param {object} vars Variables for reqest
 */
function GetRefund(vars) {
    this.method = 'GET';
    if(vars.refund_id){
        this.trailing = '/' + vars.id + '/refunds/' + vars.refund_id;
    } else {
        this.trailing = '/' + vars.id + '/refunds/';
    }
}

module.exports = GetRefund;