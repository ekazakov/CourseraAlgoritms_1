var Selection = BaseSort.extend({

    _init: function (options) {}

  , sort: function (data) {
        this._data = data;

        return this.outerLoop()
                      .then( function (result) { console.log( "ok", result ); })
                      .otherwise( function (reason) { console.log( reason.stack || reason ); });
    }

  , outerLoop: function () {
        return this.outerStep(0);
    }

  , outerStep: function (i) {
        var that = this;

        this._min = i;
        // console.log( ">> i: %s | min: %s | data: %s", i, this._min, this._data.join(" ") );
        // console.log( ">> i: %s ", i );

        return this.innerLoop( i + 1 )
                .then( function () {
                    return that._exchange( i, that._min );
                })
                .then( function () {
                    if ( i < that._data.length - 2 ) return that.outerStep( ++i );
                    return i;
                })
                .otherwise( function (reason) { console.log( reason.stack || reason ); })
    }

  , innerLoop: function (j) {
        return this.innerStep(j);
    }

  , innerStep: function (j) {
        var that = this;
        // console.log( "j: %s ", j );

        return this._less( j, this._min )
            .then( function (result) { if ( result ) { that._min = j; } })
            .then( function () {
                if ( j < that._data.length - 1 ) return that.innerStep(++j);
                return j;
            })
            .otherwise( function (reason) { console.log( reason.stack || reason ); });
    }

  , _less: function (a, b) {
        var result = this._compare( a, b ) < 0;

        return this.triggerAsync( this._prefix + ":less", {
            aIndex: a
          , bIndex: b
          , aValue: this._data[a]
          , bValue: this._data[b]
          , result: result
        }).yield( result );
    }

  , _exchange: function (a, b) {

        var swap = this._data[a];
        this._data[a] = this._data[b];
        this._data[b] = swap;

        return this.triggerAsync( this._prefix + ":swap", {
            aIndex: a
          , bIndex: b
        });

        // var defer = when.defer();
        // var promise = defer.promise;
        // var that = this;

        // setTimeout( function() {
        //     console.log( "exchange %s and %s", a, b );
        //     var swap = that._data[a];
        //     that._data[a] = that._data[b];
        //     that._data[b] = swap;

        //     defer.resolve( "" );
        // }, 0 );

        // return promise;
    }
});
