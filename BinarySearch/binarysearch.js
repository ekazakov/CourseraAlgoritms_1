function binarysearch(data, value) {
    var lo = 0;
    var hi = data.length - 1;

    while( lo <= hi ) {
        var mid = Math.floor( lo + (hi - lo) / 2 );

        if ( value < data[mid] ) hi = mid - 1
        else if ( value > data[mid] ) lo = mid + 1;
        else return mid;
    }

    return -1;
}


var data = [ 10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98 ];

console.log( 'data:', data );
console.log( "Index of 1 in data:", binarysearch( data, 1 ) );
console.log( "Index of 33 in data:", binarysearch( data, 33 ) );
console.log( "Index of 77 in data:", binarysearch( data, 77 ) );
console.log( "Index of 12 in data:", binarysearch( data, 12 ) );
console.log( "Index of 105 in data:", binarysearch( data, 105 ) );