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