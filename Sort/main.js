var data = _( 15 ).chain()
                  .times( function (n) { return n; } )
                  .shuffle()
                  .value();

var selection = new Selection();

console.log( 'before:', data.join(" ") );
selection
    .sort( data )
    .then( function () {
        console.log( 'after:', data.join(" ") );
    });
