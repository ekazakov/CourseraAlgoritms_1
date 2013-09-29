
function Simulation (perlocation, n, modelNode) {
    this.perlocation = perlocation.init( n );
    this.n = n;
    this.modelNode = modelNode;
    this.randoms = this.generateRandoms();
    this.stepCounter = 0;
    this.perlocation.on( "cell:change", this.onCellChange );
}

Simulation.prototype = {

    initModelView: function () {
        var height = this.modelNode.offsetHeight;
        var width = this.modelNode.offsetWidth;

        var cellHeight = height / this.n;
        var cellWidth  = width / this.n;

        var docFrag = document.createDocumentFragment();

        _( this.n * this.n ).times( function (i) {
            var top, left;

            left =  cellWidth * ( i % this.n );
            top  =  cellHeight * ( ~~( i / this.n ) );

            var div = $("<div>")
                        .attr( "id", i )
                        .addClass( "cell cell-blocked" )
                        .css({ height: cellHeight, width: cellWidth, top: top, left: left })
                        .css({ lineHeight: cellHeight + "px" })
                        .text(i)
                        .get(0);

            docFrag.appendChild( div );
        }, this );

        this.modelNode.appendChild( docFrag );
    }

  , generateRandoms: function () {
        return _( this.n * this.n ).chain().times( function (i) {
            return i;
        }).shuffle().value();
    }

  , simulationStep: function () {
        var simulation = this;

        setTimeout( function() {
            simulation.stepCounter++;
            simulation.perlocation.open( simulation.randoms.shift() );

            if ( simulation.perlocation.perlocates() ) {
                console.log( "Monte Carlo is over on step:", simulation.stepCounter );
                return;
            }

            simulation.simulationStep();
        }, 0 );
    }

  , startSimulation: function () {
        this.simulationStep();
    }

  , onCellChange: function  (perlocaton, cell) {
        var cellNode = document.getElementById( cell.getId() - 1 );

        if ( cell.isEmpty() ) {
            $(cellNode)
                .removeClass("cell-blocked")
                .addClass("cell-empty")
        }

        if ( cell.isFull() ) {
            $(cellNode)
                .removeClass("cell-blocked")
                .removeClass("cell-empty")
                .addClass("cell-full")
        }
    }

};

$(function () {
    var model = document.getElementById( "model" );
    var n = 4;

    var perlocation = new Perlocation();

    window.simulation = new Simulation( perlocation, n, model );
    simulation.initModelView();
});






