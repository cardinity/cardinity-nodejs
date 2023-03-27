const method = Voids.prototype;

/**
 * Sets variables for a Void request
 * @param {object} vars 
 */
function Voids(vars) {
    this.method = 'POST';
    this.trailing = '/payments/' + vars.id + '/voids';
    this.description = vars.description;
}

module.exports = Voids;