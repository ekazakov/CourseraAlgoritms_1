var _ = require( "underscore" );

function QuickUnionUF (n) {
    this._id = [];
    this._sz = [];

    for ( var i = 0; i < n; i++ ) {
        this._id.push( i );
        this._sz.push( 1 );
    }
}


QuickUnionUF.prototype = {

    _root: function (i) {
        while( i !== this._id[i] ) {
            this._id[i]  = this._id[ this._id[i] ];
            i = this._id[i];
        }
        return i;
    }

  , connected: function (p, q) {
        return this._root( p ) === this._root( q );
    }

  , union: function (p ,q) {
        var i = this._root( p );
        var j = this._root( q );

        if ( this._sz[i] < this._sz[j] ) {
            this._id[i] = j;
            this._sz[j] += this._sz[i];
        } else {
            this._id[j] = i;
            this._sz[i] += this._sz[j];
        }

    }
};

var qu = new QuickUnionUF( 10 );

// console.log( "Is connected: 0 & 1", qu.connected( 0, 1 ) );
// console.log( "Is connected: 1 & 1", qu.connected( 1, 1 ) );

// console.log( "Join 2 & 3" );
// qu.union( 2, 3 );
// console.log( "Is connected: 2 & 3", qu.connected( 2, 3 ) );

// console.log( "Join 4 and 5 " );
// qu.union( 4, 5 );
// console.log( "Is connected: 4 & 5", qu.connected( 4, 5 ) );

// console.log( "Join 3 and 4 " );
// qu.union( 3, 4 );

// console.log( "Is connected: 3 & 4", qu.connected( 3, 4 ) );

// console.log( "Join 6 and 0 and 7 & 6" );
// qu.union( 6, 0 );
// qu.union( 7, 6 );

// console.log( "Is connected: 0 & 7", qu.connected( 0, 7 ) );

qu.union( 3, 0 );
console.log( '>>', qu._id.join(" ") );
qu.union( 3, 2 );
console.log( '>>', qu._id.join(" ") );
qu.union( 6, 7 );
console.log( '>>', qu._id.join(" ") );
qu.union( 1, 8 );
console.log( '>>', qu._id.join(" ") );
qu.union( 3, 5 );
console.log( '>>', qu._id.join(" ") );
qu.union( 1, 6 );
console.log( '>>', qu._id.join(" ") );
qu.union( 3, 7 );
console.log( '>>', qu._id.join(" ") );
qu.union( 6, 9 );
console.log( '>>', qu._id.join(" ") );
qu.union( 4, 8 );
console.log( '>>', qu._id.join(" ") );

