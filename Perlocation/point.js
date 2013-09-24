function Point (i, j) {
    this._i = i;
    this._j = j;
}

Point.prototype = {

    get i() { return this._i }

  , set i(value) { this._i = value; }

  , get j() { return this._j }

  , set j(value) { this._j = value; }

  , toArray: function () { return [ this._i, this._j ]; }

  , toJSON: function () { return { "i":  this._i, "j": this._j }; }

  , isIinRange: function (lo, hi) { return this._i > lo && this._i < hi }

  , isIinRangeInclusive: function (lo, hi) { return this._i >= lo && this._i <= hi }

  , isJinRange: function (lo, hi) { return this._j > lo && this._j < hi }

  , isJinRangeInclusive: function (lo, hi) { return this._j >= lo && this._j <= hi }

};