function PropAnimation (options, animLoop) {
    this._node = options.node;
    this._prop = options.prop;
    this._statVal = options.start;
    this._endVal = options.end;
    options.callback = options.callback || this._calcPropDelta;
    Object.getPrototypeOf( this ).constructor.call( this, options, animLoop );
}

_( PropAnimation.prototype ).extend({

    constructor: PropAnimation

  , _calcPropDelta: function (rate) {
        this._node.style[ this._prop ] = this._statVal + rate * ( this._endVal - this._statVal ) + "px";
    }

}, Animation.prototype );