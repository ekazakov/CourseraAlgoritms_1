function Cell (id, point) {
    this._point = point;
    this._id = id;
    this._isOpen = false;
    this._isFull = false;
    this._isEmpty = false;
}

Cell.prototype = {

    isOpen: function () {
        return this._isOpen;
    }

  , isFull: function () {
        return this._isFull;
    }

  , isEmpty: function () {
        return this._isEmpty;
    }

  , open: function () {
        this._isOpen = true;
        this._isEmpty = true;
    }

  , fulfill: function () {
        this._isFull = true;
        this._isEmpty = false;
    }

  , getPoint: function () {
        return this._point;
    }

  , getId: function () {
        return this._id;
    }

  , toS: function () {
        if ( this._isFull ) return "F ";
        if ( this._isOpen ) return "O ";

        return "x ";
    }
};