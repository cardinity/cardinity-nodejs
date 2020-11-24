const method = GetSettlement.prototype;

/**
 * Sets varaibles to get settlement information
 * 
 * @param {object} vars Variables for reqest
 */
function GetSettlement(vars) {
    this.method = 'GET';
    if(vars.settlement_id){
        this.trailing = '/' + vars.id + '/settlements/' + vars.settlement_id;
    } else {
        this.trailing = '/' + vars.id + '/settlements/';
    }
}

module.exports = GetSettlement;