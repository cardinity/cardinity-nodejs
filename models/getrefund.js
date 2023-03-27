const method = GetRefund.prototype;

/**
 * Sets variables to get refund information
 * 
 * @param {object} vars Variables for request
 */
function GetRefund(vars) {
    this.method = 'GET';
    if(vars.refund_id){
        this.trailing = '/payments/' + vars.id + '/refunds/' + vars.refund_id;
    } else {
        this.trailing = '/payments/' + vars.id + '/refunds/';
    }
}

module.exports = GetRefund;