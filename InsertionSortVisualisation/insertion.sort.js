var data = [ 4, 5, 0, 9, 1, 3, 8, 10, 2, 6, 7 ];
var sort;

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

var oldI;

function swapItems (aIndex, bIndex, i) {
    var aItem = document.querySelector( "[data-num = '" + aIndex + "']" );
    var bItem = document.querySelector( "[data-num = '" + bIndex + "']" );
    var cursor = document.getElementById( "cursor" );
    var aOldOffset = aItem.offsetLeft;
    var bOldOffset = bItem.offsetLeft;

    bItem.dataset.num = aIndex;
    aItem.dataset.num = bIndex;

    console.log( "swap i:", i, "j:", aIndex );

    var aAnimation = new Animation ({
        time: 0.333
      , callback: function (rate) {
            aItem.style.left = aOldOffset + rate*(bOldOffset - aOldOffset) + "px"
        }}, animLoop );

    var bAnimation = new Animation ({
        time: 0.333
      , callback: function (rate) {
            bItem.style.left = bOldOffset + rate*(aOldOffset - bOldOffset) + "px";
        }}, animLoop )

    var cAnimation = new Animation({
        time: 0.333
      , callback: function (rate) {
            cursor.style.left = aOldOffset + rate*(bOldOffset - aOldOffset) + "px"
        }
    }, animLoop );

    if ( i === aIndex ) {
        var cursorOffsetLeft = cursor.offsetLeft;
        var dAnimation = new Animation({ time: 1, callback: function (rate) {
            cursor.style.left = cursorOffsetLeft + rate * ( 19 * ( i ) - cursorOffsetLeft ) + "px";
        }}, animLoop );

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

function Animation(options, animLoop) {
    this._time = options.time;
    this._callback = options.callback;
    this._animLoop = animLoop;
    this._duration = this._time * 1000;
    this._defer = when.defer();
    this._isStarted = false;
    this._isFinished = false;
}

Animation.prototype = {

    start: function () {
        this._endTime = +new Date() + this._duration;
        this._isStarted = true;
        this._animLoop.add( this );
        return this._defer.promise;
    }

  , tick: function (rate) {
        var remainingTime = this.getEndTime() - Date.now();

        if ( remainingTime <= 0 ) {
            this._callback( 1 );
            this.finish();
        } else {
            var rate = 1 - remainingTime / this.getDuration();
            this._callback( rate );
        }
    }

  , cancel: function (reason) {
        this._isFinished = true;
        this._defer.reject( reason );
    }

  , finish: function (args) {
        this._isFinished = true;
        this._defer.resolve( args );
    }

  , isStarted: function () {
        return this._isStarted;
    }

  , getEndTime: function () {
        return this._endTime;
    }

  , isFinished: function () {
        return this._isFinished;
    }

  , getDuration: function () {
        return this._duration;
    }
}

function AnimationLoop () {
    this._animations = [];
    this._isRunning = false;
    this.tick = this.tick.bind( this );
}

AnimationLoop.prototype = {

    add: function (animation) {
        this._animations.push( animation );

        if ( !this.isRunning() ) {
            this._isRunning = true;
            this.tick();
        }
    }

  , isRunning: function () {
        return this._isRunning;
    }

  , tick: function () {
        if ( this._animations.length === 0 ) {
            this._isRunning = false;
            return;
        }

        this._animations.forEach( function (animation, index, animations) {
            animation.tick();
            if ( animation.isFinished() ) {
                animations.splice( index, 1);
            }
        });

        requestAnimationFrame( this.tick );
    }
}

var animLoop = new AnimationLoop();

function foo () {

    var item1 = document.querySelector( "#foo1" );
    var item2 = document.querySelector( "#foo2" );
    var item3 = document.querySelector( "#foo3" );

    var animation1 = new Animation({ time: 1.5, callback: function(rate){
        item1.style.left = 50 + rate * ( 300 - 50 ) + "px";
    }}, animLoop );

    var animation2 = new Animation({ time: 4, callback: function(rate){
        item2.style.left = 50 + rate * ( 550 - 50 ) + "px";
        if ( item2.offsetLeft > 400 ) {
            animation2.cancel();
        }
    }}, animLoop );

    var animation3 = new Animation({ time: 0.5, callback: function(rate){
        item3.style.left = 50 + rate * ( 100 - 50 ) + "px";
    }}, animLoop );

    var p = when.all([ animation1.start(), animation3.start() ])

    p.then( function () {
        animation2.start();
    })
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
