var _ = require( "underscore" );

function UnionFind (n) {
    this._id = [];
    this._values = [];
    this._sz = [];
    this.n = n;

    for ( var i = 0; i < n; i++ ) {
        this._id.push( i );
        this._sz.push( 1 );
        this._values.push( i );
    }
}


UnionFind.prototype = {

    find: function (i) {
        while( i !== this._id[i] ) {
            this._id[i]  = this._id[ this._id[i] ];
            i = this._id[i];
        }
        return i;
    }

  , connected: function (p, q) {
        return this.find( p ) === this.find( q );
    }

  , union: function (p ,q) {
        var i = this.find( p );
        var j = this.find( q );

        if ( this._sz[i] < this._sz[j] ) {
            this._id[i] = j;
            this._sz[j] += this._sz[i];
        } else {
            this._id[j] = i;
            this._sz[i] += this._sz[j];
        }
    }

  , toS: function () {
        var s = "";
        s += this._values.join(" ") + "\n";
        s += new Array( this.n * 2 ).join("-") + "\n";
        s += this._id.join(" ");

        return s;
    }

};

module.exports = UnionFind;
