
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

function insertionSort(data) {
    for ( var i = 1; i < data.length; i++ ) {

        for ( var j = i; j > 0 && data[j] < data[j-1]; j-- ) {
            var swap = data[j];
            data[j] = data[j-1];
            data[j-1] = swap;
        }
    };
}

var data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];



shuffle( data );
console.log('shuffled:', data);

insertionSort( data );
console.log('Sorted:', data);
console.log('Reversed:', data.reverse());

insertionSort( data );
console.log('Sorted:', data);