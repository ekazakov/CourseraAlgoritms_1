var data = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 16, 17, 18,19,20,21,22, 11, 5, 13, 14,15,11 ];

$( function () {
    console.log("!");

    var stepCounter = 0;
    var main = document.getElementById( "main" );

    data = _( data ).shuffle();
    var row = createRow( data, main, stepCounter );

    main.appendChild( row );

    for ( var i = 1; i < data.length; i++ ) {
        var comparedItemIndexes = [];
        var minInStepIndex = 0;

        for ( var j = i; j > 0 && data[j] < data[j-1]; j-- ) {
            var swap = data[j];
            data[j] = data[j-1];
            data[j-1] = swap;

            comparedItemIndexes.push( j, j-1 );
        }

        stepCounter++;
        row = createRow( data, main, stepCounter );

        comparedItemIndexes.forEach( function (value) {
            var item = $( "[data-num = " + value + "]", row ).get(0);
            item.classList.remove( "inactive" );
            item.classList.add( "compared" );
        })

        setMinInStepItem( j, row );
        main.appendChild( row );
    };

})

function createRow (data, container, step) {

    var row = document.createElement( "div" );

    row.id = "row-" + step
    row.classList.add( "row" );

    _( data )
        .chain()
        .each( function (value, index) {
            row.appendChild( createItem( value, index ) );
        });

    return row;
}

function createItem (value, index, rowId) {
    var minHeight = 1;
    var item = document.createElement( "div" );

    item.classList.add( "item", "inactive" );
    item.style.height = minHeight + value + "px";
    item.dataset.num = index;

    return item;
}

function setMinInStepItem (index, row) {
    var item = $( "[data-num = " + index + "]", row ).get(0);
    item.classList.remove( "inactive", "compared" );
    item.classList.add( "last" );
}

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


