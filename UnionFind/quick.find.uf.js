function QuickFindUF (n) {
    this._id = [];

    for ( var i = 0; i < n; i++ ) {
        this._id.push( i );
    }
}

QuickFindUF.prototype = {

    union: function (p, q) {
        if ( this.connected( p, q) ) return;

        var pComponentId = this._id[p];
        var qComponentId = this._id[q];

        this._id.forEach( function (componentId, i, _id) {
            if ( componentId === pComponentId ) { _id[i] = qComponentId; }
        });
    }

  , connected: function (p, q) {
        if ( this._id[p] === this._id[q] ) return true;
        return false;
    }

  , find: function (p) {
        return 0;
    }

  , count: function () {
        return 0;
    }

  , print: function () {
        var str = "";
        var n = this._id.length;

        for ( var i = 0; i < n; i++ ) {
            str +=  "{" + i + ":" + this._id[i] + "} ";
        }

        return str;
    }

  , toString: function () {
        var components = {};

        this._id.forEach( function (componentId, i){
            if ( !( componentId in components ) ) {
                components[componentId] = [];
            }

            if ( componentId in components ) {
                components[componentId].push( i );
            }
        });

        return _.chain( components ).reduce( function( memo, value, key ) {
            return memo + "{" + key + ":" + value + "} ";
        }, "" ).value();
    }
};

var qf = new QuickFindUF( 10 );
console.log( qf.toString() );

console.log( qf.connected( 0, 1 ) );
console.log( qf.connected( 1, 1 ) );

console.log( "Join 2 & 3" );
qf.union( 2, 3 );
console.log( "Is connected: 2 & 3", qf.connected( 2, 3 ) );

console.log( "Join 4 and 5 " );
qf.union( 4, 5 );
console.log( "Is connected: 4 & 5", qf.connected( 4, 5 ) );
console.log( qf.toString() );

console.log( "Join 3 and 4 " );
qf.union( 3, 4 );

console.log( "Is connected: 3 & 4", qf.connected( 3, 4 ) );
console.log( qf.toString() );

console.log( "Join 6 and 0 and 7 & 6" );
qf.union( 6, 0 );
qf.union( 7, 6 );
console.log( qf.toString() );

// qf.union( 4, 7 );
// qf.union( 9, 5 );
// qf.union( 8, 9 );
// qf.union( 4, 2 );
// qf.union( 0, 7 );
// qf.union( 8, 6 );

// console.log(">>", qf._id.join(" ") );
