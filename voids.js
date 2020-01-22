var method = Voids.prototype;

function Voids(vars) {
    this.method = 'POST'
    this.trailing = '/' + vars.id + '/voids'
    this.description = vars.description
}

module.exports = Voids;