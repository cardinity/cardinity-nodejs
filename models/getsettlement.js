const method = GetSettlement.prototype;

/**
 * Sets variables to get settlement information
 * 
 * @param {object} vars Variables for request
 */
function GetSettlement(vars) {
    this.method = 'GET';
    if(vars.settlement_id){
        this.trailing = '/payments/' + vars.id + '/settlements/' + vars.settlement_id;
    } else {
        this.trailing = '/payments/' + vars.id + '/settlements/';
    }
}

module.exports = GetSettlement;