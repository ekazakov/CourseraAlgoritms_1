function Animation(options, animLoop) {
    if ( !_( animLoop ).isObject() ) throw new Error("Require specify animation loop property.");

    this._time = options.time;
    this._callback = options.callback;
    this._animLoop = animLoop;
    this._duration = this._time * 1000;
    this._defer = when.defer();
    this._isStarted = false;
    this._isFinished = false;
}

Animation.prototype = {

    constructor: Animation

  , start: function () {
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