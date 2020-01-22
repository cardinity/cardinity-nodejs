var method = Voids.prototype;

function Voids(vars) {
    if(vars.void_id){
        this.method = 'GET'
        this.trailing = '/' + vars.id + '/voids/' + vars.void_id
    } else {
        this.method = 'GET'
        this.trailing = '/' + vars.id + '/voids/'
    }
}

module.exports = Voids;