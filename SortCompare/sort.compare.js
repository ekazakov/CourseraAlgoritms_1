
var algorithms = Object.create( null );

_( algorithms ).extend({
    selectionSort: function (data) {
        for ( var i = 0; i < data.length; i++ ) {
            var min = i;

            for ( var j = i+1; j < data.length; j++ ) {
                if ( data[j] < data[min] ) { min = j; }
            };

            var swap  = data[min];
            data[min] = data[i];
            data[i]   = swap;
        }
    }

  , insertionSort: function (data) {
        for ( var i = 1; i < data.length; i++ ) {

            for ( var j = i; j > 0 && data[j] < data[j-1]; j-- ) {
                var swap = data[j];
                data[j] = data[j-1];
                data[j-1] = swap;
            }
        };
    }

  , insertionSortSentinel: function (data) {
        for ( var i = 1; i < data.length; i++ ) {

            for ( var j = i; j > 0 && data[j] < data[j-1]; j-- ) {
                var swap = data[j];
                data[j] = data[j-1];
                data[j-1] = swap;
            }
        };
    }

  , shellSort: function (data) {
    var h = 1;
    var n = data.length;

    while ( h < n/3 ) h = 3 * h + 1;

    while ( h >= 1 ) {

        for ( var i = h; i < n; i++ ) {
            for ( var j = i; j >= h && data[j] < data[j-h]; j -= h ) {
                var swap = data[j];
                data[j] = data[j-h];
                data[j-h] = swap;
            }
        }

        console.log( "H: %s Data: %o", h, data );
        h = Math.floor( h / 3 );
    }

}
});

function generateArray (size) {
    return _( size ).chain().times( function(n) { return n; }).shuffle().value();
}

function runExperiment ( fun, data ) {
    var startAt = Date.now();
    fun.call( null, data );
    return Date.now() - startAt;
}

function SortCompare (algorithms, arrSize, experimentsCount) {
    var algTime = {};

    for ( var algorithm in algorithms ) {
        algTime[ algorithm ] = 0;
    }

    for ( var i = 0; i < experimentsCount; i++ ) {
        var data = generateArray( arrSize );

        for ( var algorithm in algorithms ) {
            algTime[ algorithm ] += runExperiment( algorithms[algorithm], _( data ).clone() );
        }
    };

    console.log( "For arraya of %s elements and %s iterations", arrSize, experimentsCount )
    for ( var algorithm in algorithms ) {
        console.log( "Algorithm " + algorithm + " time is: " + algTime[ algorithm ] + " ms" );
    }

}