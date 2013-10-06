var data = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
 var sort;
$( function () {
    var main = document.getElementById( "main" );

    data = _( data ).shuffle();
    sort = new InsertionSort( data );
    var row = initItems( data );

    main.appendChild( row );
});

function tick () {
        if ( sort.isOver() ) {
            return;
        }

        sort.step().then( function () {
            tick();
        });
}

function initItems (data) {
    var row = document.createElement( "div" );

    row.id = "row";
    row.classList.add( "row" );

    _( data )
        .chain()
        .each( function (value, index) {
            row.appendChild( createItem( value, index ) );
        });

    return row;
}

function createItem (value, index) {
    var minHeight = 50;
    var width = 18;
    var margin = 1;
    var item = document.createElement( "div" );

    item.classList.add( "item" );
    item.style.height = minHeight + value + "px";
    item.style.left = ( width + margin ) * index + "px"
    item.dataset.num = index;
    item.textContent = value;

    return item;
}

function swapItems (aIndex, bIndex) {
    var aItem = document.querySelector( "[data-num = '" + aIndex + "']" );
    var bItem = document.querySelector( "[data-num = '" + bIndex + "']" );

    var aOldOffset = aItem.offsetLeft;
    var aDefer = when.defer();
    var bDefer = when.defer();

    $( aItem ).one( "transitionend webkitTransitionEnd", function (event) {
        aDefer.resolve( event );
    });

    $( bItem ).one( "transitionend webkitTransitionEnd", function (event) {
        bDefer.resolve( event );
    });

    var promise = when.all( [ aDefer.promise, bDefer.promise ] );

    aItem.style.left = bItem.offsetLeft + "px"
    bItem.style.left = aOldOffset + "px";

    bItem.dataset.num = aIndex;
    aItem.dataset.num = bIndex;

    return promise;
}

function InsertionSort (data) {
    this._data = data;
    this._size = data.length;
    this._stepCounter = 0;
    this._i = 0;
    this._j = 0;
}

InsertionSort.prototype = {

    start: function () {
        this._i = 1;
        this._j = this._i;
    }

  , step: function () {
        var promise;
        this._stepCounter++;

        if ( !this._isInnerLoopOver() ) {
            this._innerStep();
            promise = swapItems( this._j, this._j - 1);
            this._j--;
        } else {
            this._i++;
            this._j = this._i;
            promise = when.resolve( null );
        }

        return promise;
    }

  , _innerStep: function () {
        var swap = this._data[ this._j ];
        this._data[ this._j ] = this._data[ this._j - 1 ];
        this._data[ this._j - 1 ] = swap;
    }

  , _isInnerLoopOver: function () {
        return this._j <= 0 || this._data[ this._j ] >= this._data[ this._j - 1 ];
    }

  , isOver: function () {
        return !( this._i < this._size );
    }

  , reset: function () {
        this._stepCounter = 0;
        this._i = 0;
        this._j = 0;
    }
}

