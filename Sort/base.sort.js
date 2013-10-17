function extend (props) {
    var parent = this;
    var child;

    if ( props && _.has( props, "constructor") ) {
        child = props.constructor;
    } else {
        child = function () { return parent.apply( this, arguments ); }
    }

    _( child ).extend( parent );

    var F = function () { this.constructor = child; };
    F.prototype = parent.prototype;
    child.prototype = new F();

    if ( props ) _( child.prototype ).extend( props );

    child.__super__ = parent.prototype;

    return child;
}

function BaseSort (options) {
    options || ( options = {} );
    this._compare = options.compare || this._compare;
    this._prefix  = options.prefix  || "sort";
    this._init( options );
}

BaseSort.prototype = {

    _init: function (options) {

    }

  , _compare: function (a, b) {
        if ( this._data[a] > this._data[b] ) return 1;
        if ( this._data[a] < this._data[b] ) return -1;
        return 0;
    }

  , _less: function (a, b) {
        var result = this._compare( a, b ) < 0;

        this.trigger( this._prefix + ":less", {
            aIndex: a
          , bIndex: b
          , aValue: this._data[a]
          , bValue: this._data[b]
          , result: result
        });

        return result;
    }

  , _exchange: function (a, b) {
        var swap = this._data[a];
        this._data[a] = this._data[b];
        this._data[b] = swap;

        this.trigger( this._prefix + ":swap", {
            aIndex: a
          , bIndex: b
        });
    }

  , sort: function (data) {
        throw Error( "Not implemented" );
    }
}

BaseSort.extend = extend;

_( BaseSort.prototype ).extend( Observable );
