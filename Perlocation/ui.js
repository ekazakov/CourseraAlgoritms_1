var perlocation;

$(function () {
    var model = document.getElementById( "model" );
    var n = 100;
    var height = model.offsetHeight;
    var width = model.offsetWidth;

    var cellHeight = height / n;
    var cellWidth  = width / n;

    var docFrag = document.createDocumentFragment();

    _( n * n ).times( function (i) {
        var top, left;

        left =  cellWidth * ( i % n );
        top  =  cellHeight * ( ~~( i / n ) );

        var div = $("<div>")
                    .attr( "id", i )
                    .addClass( "cell cell-blocked" )
                    .css({ height: cellHeight, width: cellWidth, top: top, left: left })
                    // .css({ lineHeight: cellHeight + "px" })
                    // .text(i)
                    .get(0);

        docFrag.appendChild( div );
    });

    console.timeStamp("AAAA");

    console.time("render black");
    model.appendChild( docFrag );

    console.timeStamp("BBBB");

    perlocation = new Perlocation( n );
    var randoms = _( n * n ).chain().times( function (i) {
        return i;
    }).shuffle().value();
    console.timeEnd("render black");

    console.time("Simulation");
    for ( var i = 0; i < randoms.length; i++ ) {
        perlocation.open( randoms[i] );

        if ( perlocation.perlocates() ) break;
    };
    console.timeEnd("Simulation");

    console.timeStamp("CCCC");

    // console.time("render");
    // updateCells();
    // console.timeEnd("render");

    // console.timeStamp("DDDD");
    // simulate( randoms, 0, step );


});

function simulate ( randoms, counter, callback ) {
    // var steps = 0;

    setTimeout( function() {
        counter++;

        if ( !callback( randoms.shift() ) ) {
            simulate( randoms, counter, callback );
        } else {
            console.log( "Monte Carlo is over!", counter );
        }
    }, 0 );
}

function step(id) {
    perlocation.open( id );
    updateCells();

    return perlocation.perlocates();
}

function updateCells () {
    var model = document.getElementById( "model" );

    _( model.children ).each( function( node, index ) {
        var cell = perlocation.cells[index];

        if ( cell.isEmpty() ) {
            $(node)
                .removeClass("cell-blocked")
                .addClass("cell-empty")
        }

        if ( cell.isFull() ) {
            $(node)
                .removeClass("cell-blocked")
                .addClass("cell-full")
        }
    })
    // console.log( 'cell:', cell );
}


var arr = [ 127, 107, 128, 129, 147, 146, 87, 67, 47, 27, 28, 29, 26 ];


