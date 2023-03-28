const method = Voids.prototype;

/**
 * Sets variables to get void information
 * 
 * @param {object} vars Variables for request
 */
function Voids(vars) {
    this.method = 'GET';
    if(vars.void_id){
        this.trailing = '/payments/' + vars.id + '/voids/' + vars.void_id;
    } else {
        this.trailing = '/payments/' + vars.id + '/voids/';
    }
}

module.exports = Voids;