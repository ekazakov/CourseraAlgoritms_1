var Selection = BaseSort.extend({

    _init: function (options) {
        // this._i = 0;
        // this._j = this._i + 1;
    }

  , sort: function (data) {
        this._data = data;
        return this.outerLoop()
                      .then( function (result) { console.log( "ok", result ); })
                      .otherwise( function (reason) { console.log( reason.stack || reason ); });

        // var len = this._data.length;
        // var min;

        // for ( var i = 0; i < len; i++ ) {
        //     min = i;
        //     for ( var j = i + 1; j < len; j++ ) {
        //         if ( this._less( j, min ) ) {
        //             min = j;
        //         }
        //     }

        //     this._exchange( i, min );
        // }
    }

  , outerLoop: function () {
        return this.outerStep(0);
    }

  // , outerStep: function (i) {
  //       var defer   = when.defer();
  //       var promise = defer.promise;
  //       var that    = this;

  //       this._min = i;
  //       console.log( ">> i: %s | min: %s | data: %s", i, this._min, this._data.join(" ") );

  //       if ( i + 1 < this._data.length ) {
  //           this.innerLoop( i + 1 )
  //               .then( function () {
  //                   that._exchange( i, that._min );
  //               })
  //               .then( function () { defer.resolve( ++i ); })
  //               .otherwise( function (reason) { console.log( reason.stack || reason ); })
  //       } else {
  //           defer.resolve( ++i );
  //       }

  //       return promise.then( function (k) {
  //           if ( k < that._data.length ) return that.outerStep(k);
  //           return k;
  //       });
  //   }

  , outerStep: function (i) {
        var that    = this;

        this._min = i;
        console.log( ">> i: %s | min: %s | data: %s", i, this._min, this._data.join(" ") );

        if ( i + 1 < this._data.length ) {
            return this.innerLoop( i + 1 )
                    .then( function () {
                        return that._exchange( i, that._min );
                    })
                    .then( function () {
                        return that.outerStep( ++i );
                    })
                    .otherwise( function (reason) { console.log( reason.stack || reason ); })
        }

        return i;
    }

  , innerLoop: function (j) {
        return this.innerStep(j);
    }

  , innerStep: function (j) {
        var that    = this;

        return this._less( j, this._min )
            .then( function (result) { if ( result ) { that._min = j; } })
            .then( function () {
                if ( j < that._data.length ) return that.innerStep(++j);
                return j;
            })
            .otherwise( function (reason) { console.log( reason.stack || reason ); });

    }

  , _less: function (a, b) {
        var defer = when.defer();
        var promise = defer.promise;
        var that = this;

        setTimeout( function() {
            var result = that._compare( a, b ) < 0;
            defer.resolve( result );
        }, 0 );

        return promise;
    }

  , _exchange: function (a, b) {
        var defer = when.defer();
        var promise = defer.promise;
        var that = this;

         setTimeout( function() {
            console.log( "exchange %s and %s", a, b );
            var swap = that._data[a];
            that._data[a] = that._data[b];
            that._data[b] = swap;

            defer.resolve( "" );
        }, 0 );

        return promise;


    }
});
