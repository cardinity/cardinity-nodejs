var method = Finalize.prototype;

/**
 * Sets varaibles for a Finalize request
 * 
 * @param {object} vars Variables for reqest
 */
function Finalize(vars) {
    this.method = 'PATCH';
    this.trailing = '/' + vars.id;
    this.authorize_data = vars.authorize_data;
}

module.exports = Finalize;