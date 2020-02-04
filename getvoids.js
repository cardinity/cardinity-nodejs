var method = Voids.prototype;

function Voids(vars) {
    this.method = 'GET';
    if(vars.void_id){
        this.trailing = '/' + vars.id + '/voids/' + vars.void_id;
    } else {
        this.trailing = '/' + vars.id + '/voids/';
    }
}

module.exports = Voids;