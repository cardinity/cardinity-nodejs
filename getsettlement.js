var method = GetSettlement.prototype;

function GetSettlement(vars) {
    if(vars.settlement_id){
        this.method = 'GET'
        this.trailing = '/' + vars.id + '/settlements/' + vars.settlement_id
    } else {
        this.method = 'GET'
        this.trailing = '/' + vars.id + '/settlements/'
    }
}

module.exports = GetSettlement;