
function CurveSankey(context) {
    this._context = context;
}

CurveSankey.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = this._y = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x; y = +y;
        switch (this._point) {
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2; // proceed
            default:
                var mx = (x - this._x) / 2 + this._x;
                this._context.bezierCurveTo(mx, this._y, mx, y, x, y);
                break;
        }
        this._x = x; this._y = y;
    }
};

export var curveSankey = function(context) {
    return new CurveSankey(context);
}
