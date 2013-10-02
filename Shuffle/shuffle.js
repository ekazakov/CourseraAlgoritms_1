
function uniformRand (n) {
    return Math.floor( Math.random() * n );
}

function shuffleInPlace (a) {
    var n = a.length;

    for (var i = 0; i < n; i++) {
        var r = i + uniformRand( n - i );
        var swap = a[i];
        a[i] = a[r];
        a[r] = swap;
    };
}

function shuffleInsideOut (source) {
    var a = [];
    var index = 0;
    var r;

    source.forEach( function (value) {
        r = uniformRand( index++ );
        a[ index - 1 ] = a[r];
        a[r] = value;
    });

    return a;
}