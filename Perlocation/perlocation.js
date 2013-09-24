var _ = require( "underscore" );
var UnionFind = require( "./unionfind" );

function Cell (id, i, j) {
    this.i = i;
    this.j = j;
    this.id = id;
    this._isOpen = false;
    this._isFull = false;
}

Cell.prototype = {

    isOpen: function () {
        return this._isOpen;
    }

  , isFull: function () {
        return this._isFull;
    }

  , open: function () {
        this._isOpen = true;
    }

  , fulfill: function () {
        this._isFull = true;
    }

  , toId: function () {
        return this.id;
    }

  , toS: function () {
        if ( this._isFull ) return "F ";
        if ( this._isOpen ) return "O ";

        return "x ";
    }

};

function Perlocation (n) {
    this.n = n;
    this.cells = [];
    this.uf = new UnionFind( n * n + 2 );

    for ( var i = 0; i < n; i++ ) {
        this.cells[i] = [];

        for ( var j = 0; j < n; j++ ) {
            var id = i * n + j + 1;
            this.cells[i][j] = new Cell( id, i, j );
        };
    };
}

Perlocation.prototype = {

    // checkIndexRange: function (index, name) {
    //     var msg = name + " is out of range. " + name + " = " + index +
    //               "; must be between 1 and " + this.n;
    //     if ( index < 0 || index > this.n ) throw Error( msg );
    // }

    getAdjancetCells: function (i, j) {
        var adjancetCells = [];

        if ( i < this.n && i - 1 >= 0 && j >= 0 && j < this.n ) {
            adjancetCells.push( this.cells[i - 1][j] );
        }

        if ( i >= 0 && i + 1 < this.n && j >= 0 && j < this.n ) {
            adjancetCells.push( this.cells[i + 1][j] );
        }

        if ( i >= 0 && i < this.n && j + 1 < this.n && j >= 0 ) {
            adjancetCells.push( this.cells[i][j + 1] );
        }

        if ( i >= 0 && i < this.n && j - 1 >= 0 && j < this.n ) {
            adjancetCells.push( this.cells[i][j - 1] );
        }

        return adjancetCells;
    }

  , open: function (i, j) {
        var cellA = this.cells[i][j];
        var adjCells = this.getAdjancetCells( i, j );

        cellA.open();

        if ( i === 0 ) this.uf.union( 0, cellA.toId() );

        adjCells.forEach( function (cell) {
            if ( cell.isOpen() ) this.uf.union( cellA.toId(), cell.toId() );
        }, this );

        if ( i === this.n - 1 ) this.uf.union( this.n * this.n + 1, cellA.toId() );
    }

  , isOpen: function (i, j) {
        this.checkIndexRange( i, "I" );
        this.checkIndexRange( j, "J" );
        return this.cells[i][j].isOpen();
    }

  , perlocates: function () {
        return this.uf.connected( 0, this.n * this.n + 1 );
    }

  , size: function () {
        return this.n;
    }

  , toS: function () {
        return _.chain( this.cells ).reduce( function (memo, row, i, cells) {
            return memo += _.chain( row ).reduce( function (memo, cell) {
                return memo += cell.toS();
            }, "" ).value() + "\n";
        }, "" ).value();
    }

};

var p = new Perlocation( 3 );
console.log( ">> is perlocates", p.perlocates() );
printMap( p );

p.open( 1, 0 )
console.log( ">>", "open: (1,0)#4" );
console.log( ">> is perlocates", p.perlocates() );
printMap( p );

p.open( 0, 0 )
console.log( ">>", "open: (0,0)#1" );
printMap( p );

// console.log( p.getAdjancetCells(0,0) );

p.open( 1, 1 )
console.log( ">>", "open: (1,1)#5" );
console.log( ">> is perlocates", p.perlocates() );
printMap( p );

p.open( 2, 1 )
console.log( ">>", "open: (2,1)#8" );
// console.log( ">> is (1,0)#1 & (3,1)#8 connected?", p.uf.connected( 1, 8 ) );
console.log( ">> is perlocates", p.perlocates() );
printMap( p );




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

function printMap (p) {
    console.log( p.toS() );
    console.log( p.uf.toS(), "\n\n" );
}
