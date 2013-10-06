var animLoop = new AnimationLoop();
var data = [ 4, 5, 0, 9, 2, 7, 1, 3, 8, 3, 10, 2, 6, 7, 11 ];
var sort;

function tick () {
        if ( sort.isOver() ) return;

        try {
            sort.step()
                .then( function () { tick(); },
                       function (reason) { console.log( reason ) });
        } catch( e ) { console.log( e.stack )}
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

function swapItems (curJIndex, prveJIndex, index) {
    var cursor = document.getElementById( "cursor" );
    var aItem = document.querySelector( "[data-num = '" + curJIndex + "']" );
    var bItem = document.querySelector( "[data-num = '" + prveJIndex + "']" );

    var aOldOffset = aItem.offsetLeft;
    var bOldOffset = bItem.offsetLeft;

    bItem.dataset.num = curJIndex;
    aItem.dataset.num = prveJIndex;

    console.log( "swap i:", index, "j:", curJIndex );

    var aAnimation = new PropAnimation({
        time  : 0.333
      , node  : aItem
      , prop  : "left"
      , start : aOldOffset
      , end   : bOldOffset
    }, animLoop );

    var bAnimation = new PropAnimation ({
        time  : 0.333
      , node  : bItem
      , prop  : "left"
      , start : bOldOffset
      , end   : aOldOffset
    }, animLoop )

    var cAnimation = new PropAnimation({
        time  : 0.333
      , node  : cursor
      , prop  : "left"
      , start : aOldOffset
      , end   : bOldOffset
    }, animLoop );

    if ( index === curJIndex ) {
        var cursorOffsetLeft = cursor.offsetLeft;

        dAnimation = new PropAnimation({
            time  : 1
          , node  : cursor
          , prop  : "left"
          , start : cursorOffsetLeft
          , end   : 19 * index
        }, animLoop );

        return dAnimation.start().then( function () {
            return when.all([ aAnimation.start(), cAnimation.start(), bAnimation.start() ]);
        })
    } else {
        return when.all([ aAnimation.start(), cAnimation.start(), bAnimation.start() ]);
    }
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
        console.log('step:', this._stepCounter,  '  i:', this._i, "j:", this._j)
        this._stepCounter++;

        if ( !this._isInnerLoopOver() ) {
            this._innerStep();
            promise = swapItems( this._j, this._j - 1, this._i );
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

$( function () {
    var main = document.getElementById( "main" );

    // data = _( data ).shuffle();
    sort = new InsertionSort( data );
    var row = initItems( data );

    main.appendChild( row );
    sort.start();

    $( "#btn-next" ).on( "click", function () {
        if ( !sort.isOver() ) sort
                                .step()
                                .then( function() {
                                    console.log('step over')
                                }, function (reason) {
                                    console.log( reason.stack || reason )
                                });
    })
});
