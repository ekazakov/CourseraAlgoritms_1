var _ = require( "underscore" );

function merge (data, aux, lo, mid, hi) {
    for ( var k = lo; k <= hi; k++ ) { aux[k] = data[k]; };

    var i = lo, j = mid + 1;
    for ( var k = lo; k <= hi; k++ ) {
        if ( i > mid )              data[k] = aux[j++];
        else if ( j > hi )          data[k] = aux[i++];
        else if ( aux[j] < aux[i] ) data[k] = aux[j++];
        else                        data[k] = aux[i++];
    }
}

function bottomUpMergeSort (data) {
    var n = data.length;
    var aux = new Array(n);
    for ( var sz = 1; sz < n; sz = sz + sz ) {
        for ( var lo = 0; lo < n - sz; lo += sz + sz ) {
            merge( data, aux, lo, lo + sz - 1, Math.min( lo + sz + sz - 1, n - 1 ) );
        }
    }
}

function topDownMergeSort (data, lo, hi, aux) {
    aux === undefined && ( aux = Array( data.length ) );
    lo === undefined  && ( lo = 0 );
    hi === undefined  && ( hi = data.length - 1 )

    if ( hi <= lo ) return;

    var mid = lo + Math.floor( ( hi - lo ) / 2 );

    topDownMergeSort( data, lo, mid, aux );
    topDownMergeSort( data, mid + 1, hi, aux );
    merge( data, aux, lo, mid, hi );
}


var data = _(50).chain().times( function(n) { return n }).shuffle().value();

console.log( "data:", data.join(" ") );

// bottomUpMergeSort( data );
topDownMergeSort( data );
console.log( "data:", data.join(" ") );