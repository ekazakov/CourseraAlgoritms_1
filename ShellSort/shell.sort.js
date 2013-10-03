function uniformRand (n) {
    return Math.floor( Math.random() * n );
}

function shuffle (a) {
    var n = a.length;

    for (var i = 0; i < n; i++) {
        var r = i + uniformRand( n - i );
        var swap = a[i];
        a[i] = a[r];
        a[r] = swap;
    };
}

function createArray (n) {
    var data = [];

    for ( var i = 0; i < n; i++ )
        data[i]= i;

    return data;
}

function shellSort(data) {
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

        h = Math.floor( h / 3 );
    }

}

var data = createArray( 54 );



shuffle( data );
console.log('shuffled:', data.join(" "));

shellSort( data );
console.log('Sorted:', data.join(" "));
console.log('Reversed:', data.reverse().join(" "));

shellSort( data );
console.log('Sorted:', data.join(" "));