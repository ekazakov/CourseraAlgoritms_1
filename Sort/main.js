


function initItems (data) {
    var row = document.createElement( "div" );

    row.id = "row";
    row.classList.add( "row" );

    _( data )
        .chain()
        .each( function (value, index) {
            row.appendChild( createItem( value, index ) );
        });

    var cursor = document.createElement( "div" );
    cursor.classList.add( "cursor" );
    cursor.id = "cursor";

    row.appendChild( cursor );
    return row;
}

function createItem (value, index) {
    var minHeight = 20;
    var width = 18;
    var margin = 1;
    var item = document.createElement( "div" );

    item.classList.add( "item" );
    item.style.height = minHeight + value*8 + "px";
    item.style.left = ( width + margin ) * index + "px"
    item.dataset.num = index;
    item.textContent = value;

    return item;
}


var data = _( 40 ).chain()
              .times( function (n) { return n; } )
              .shuffle()
              .value();

function start () {
    var selection = new Selection();

    selection.on( "sort:less", function (params) {
        var defer = when.defer();
        setTimeout(function() {
            console.log( "less:", params );
            defer.resolve( "" );
        }, 0);

        return defer.promise;
    });

    selection.on( "sort:swap", function (params) {
        var defer = when.defer();
        setTimeout(function() {
            console.log( "swap:", params );
            defer.resolve( "" );
        }, 0);

        return defer.promise;
    });

    console.log( 'before:', data );
    selection
        .sort( data )
        .then( function () {
            console.log( 'after:', data );
        });
}

$( function () {

    var main = document.getElementById( "main" );
    var row = initItems( data );

    main.appendChild( row );


    // $( "#btn-next" ).on( "click", function () {
    //     if ( !sort.isOver() ) sort
    //                             .step()
    //                             .then( function() {
    //                                 console.log('step over')
    //                             }, function (reason) {
    //                                 console.log( reason.stack || reason )
    //                             });
    // })
});
