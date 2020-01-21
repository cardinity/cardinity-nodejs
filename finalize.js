var method = Finalize.prototype;

function Finalize(vars) {
    this.method = 'PATCH'
    this.trailing = vars.trailing
    this.authorize_data = vars.authorize_data
}

module.exports = Finalize;