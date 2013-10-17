var Observable = {

    on: function (type, listener, context) {
        this._listeners = this._listeners || {};
        this._listeners[type] = this._listeners[type] || [];
        this._listeners[type].push([ listener, context ]);
    }

  , trigger: function (type) {
        if ( !this._listeners ) return;

        var list = this._listeners[type];

        if ( !list ) return;
        var args = Array.prototype.slice.call( arguments, 1);


        list.forEach( function (listener) {
            listener[0].apply( listener[1], args)
        })
    }

  , off: function (type, listener, context) {
        if ( !this._listeners ) return;
        var list = this._listeners[type];
        if ( !list ) return;

        var i = list.length;

        while( i-- ) {
            if ( list[i][0] === listener && list[i][1] === context ) {
                list.splice( i, 1 );
            }
        }
    }

  , makeObservableProp: function (propName) {
        this[propName + "SrcValue"] = this[propName];

        Object.defineProperty( this, propName, {
            get: function () { return this[propName + "SrcValue"]; }

          , set: function (value) {
                if ( this[propName + "SrcValue"] !== value ) {
                    this.trigger( propName + ":change", value, this );
                }
                this[propName + "SrcValue"] = value;
            }

          , enumerable: true

          , configurable: true
        });
    }

}

function Subscription (target, type, listener, context) {
    this._target = target;
    this._type = type;
    this._listener = listener;
    this._context = context;
    this._active = true;
}

Subscription.prototype.cancel = function() {
    if ( !this._active ) return;
    this._target.off( this._type, this._listener, this._context );
    this._active = false;
};



