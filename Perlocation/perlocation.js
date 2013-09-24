
function Perlocation (n) {
    this.n = n;
    this.sink = this.n * this.n + 1
    this.cells = [];
    this.uf = new UnionFind( n * n + 2 );

    for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++ ) {
            var id = i * n + j + 1;
            var cell = new Cell( id, new Point( i, j ) );
            this.cells.push( cell );
        };
    };
}

Perlocation.prototype = {

    cellFromPoint: function (point) {
        return this.cells[ point.i * this.n + point.j ];
    }

  , getAdjancetCells: function (cell) {
        var adjancetCells = [];
        var p = cell.getPoint();
        var point;

        if ( p.isIinRange( 0, this.n ) && p.isJinRange( -1, this.n ) ) {
            point = new Point( p.i - 1, p.j );
            adjancetCells.push( this.cellFromPoint( point ) );
        }

        if ( p.isIinRange( -1, this.n - 1 ) && p.isJinRange( -1, this.n ) ) {
            point = new Point( p.i + 1, p.j );
            adjancetCells.push( this.cellFromPoint( point ) );
        }

        if ( p.isIinRange( -1, this.n ) && p.isJinRange( -1, this.n - 1 ) ) {
            point = new Point( p.i, p.j + 1 );
            adjancetCells.push( this.cellFromPoint( point ) );
        }

        if ( p.isIinRange( -1, this.n - 1 ) && p.isJinRange( 0, this.n ) ) {
            point = new Point( p.i, p.j - 1 );
            adjancetCells.push( this.cellFromPoint( point ) );
        }

        return adjancetCells;
    }

  , fulfillAdjacent: function (cell) {
        this.getAdjancetCells( cell ).forEach( function (cell) {

            if ( cell.isEmpty() ) {
                cell.fulfill();
                this.fulfillAdjacent( cell );
            }
        }, this );
    }

  , pointFromId: function (id) {
        var i = ~~( ( id ) / this.n );
        var j = ( id ) % this.n;

        return new Point( i, j );
    }

  , open: function ( id ) {
        var point = this.pointFromId( id );

        var cell = this.cellFromPoint( point );
        var adjCells = this.getAdjancetCells( cell );

        cell.open();

        if ( point.i === 0 ) {
            this.uf.union( 0, cell.getId() );
            cell.fulfill();
        }

        adjCells.forEach( function (adjCell) {
            if ( adjCell.isOpen() ) this.uf.union( cell.getId(), adjCell.getId() );

            if ( !cell.isFull() && adjCell.isFull() ) cell.fulfill();
        }, this );

        if ( point.i === this.n - 1 ) this.uf.union( this.sink, cell.getId() );

        if ( cell.isFull() ) { this.fulfillAdjacent( cell ); }
    }

  , perlocates: function () {
        return this.uf.connected( 0, this.sink );
    }

  , size: function () {
        return this.n;
    }

  , toS: function () {
        var map = "";
        var n = this.n;

        function isLastInRow (index) {
            if ( index !== 0 && ( index + 1 ) % n === 0 ) return true;
            return false;
        }

        _( this.cells ).each( function( cell, index ) {
            map += cell.toS();

            if ( isLastInRow( index ) ) map += "\n";
        }, this );

        return map;
    }

};

// var p = new Perlocation( 4 );
// console.log( ">> is perlocates", p.perlocates() );
// printMap( p );

// p.open( 1, 0 )
// console.log( ">>", "open: (1,0)#4" );
// console.log( ">> is perlocates", p.perlocates() );
// printMap( p );

// p.open( 0, 0 )
// console.log( ">>", "open: (0,0)#1" );
// printMap( p );

// p.open( 1, 1 )
// console.log( ">>", "open: (1,1)#5" );
// console.log( ">> is perlocates", p.perlocates() );
// printMap( p );

// p.open( 2, 1 )
// console.log( ">>", "open: (2,1)#8" );
// // console.log( ">> is (1,0)#1 & (3,1)#8 connected?", p.uf.connected( 1, 8 ) );
// console.log( ">> is perlocates", p.perlocates() );
// printMap( p );




// function rand (size) {
//     return Math.floor( Math.random() * size );
// }

// function MonteCarlo (perlocation) {
//     var times = 30;
//     var n = perlocation.size();

//     for ( var k = 0; k < times; k++ ) {
//         var i = rand( n );
//         var j = rand( n );

//         while( perlocation.isOpen( i, j ) ) {
//             // console.log('i:', i, " j:", j );
//             i = rand( n );
//             j = rand( n );
//         }

//         perlocation.open( i, j );
//     };

// }

// MonteCarlo( p );

// console.log( "\n\n" + p.toS() );

// function printMap (p) {
//     console.log( p.toS() );
//     console.log( p.uf.toS(), "\n\n" );
// }
