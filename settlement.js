var method = Settle.prototype;

function Settle(vars) {
    this.method = 'POST'
    this.trailing = '/' + vars.id + '/settlements'
    this.amount = vars.amount
    this.description = vars.description
}

module.exports = Settle;