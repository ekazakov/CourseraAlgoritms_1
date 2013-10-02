function RandomArrayIterator (arr) {
    this.arr = arr;
    // this.step = 0;
    this.maxPeekIndex = this.arr.length - 1;
}

var random = function(min, max) {

    if (max == null) {
        max = min;
        min = 0;
    }

    return min + Math.floor(Math.random() * (max - min + 1));
};

RandomArrayIterator.prototype = {

    hasNext: function () {
        // return this.step < this.arr.length;
        return this.maxPeekIndex >= 0;
    }

  , next: function () {
        var randomIndex = random( 0, this.maxPeekIndex );
        var randomItem  = this.arr[ randomIndex ];
        var exchangeItem    = this.arr[ this.maxPeekIndex ];

        this.arr[ randomIndex ] = exchangeItem;
        this.arr[ this.maxPeekIndex ] = randomItem;

        this.maxPeekIndex--;

        return randomItem;
    }
}

var a = [0,1,2,3,4,5,6,7,8,9,10,11,12];

console.log( "before:", a );

var raIterator = new RandomArrayIterator( a );
var i = 0;

while( raIterator.hasNext() ) {
    console.log( i++ + ".", "Item:", raIterator.next() );
}

console.log( "after:", a );