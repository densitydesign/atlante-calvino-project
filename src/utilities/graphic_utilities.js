
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
                break;
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

export function append_tooltip_entry(tooltip, index, color)
{
  const margin = { top : 25, left : 5, right : 5, bottom : 5 };
  const entry_icon_x = margin.left + 50;

  const entry_row_height = 17;
  const entry_icon_y_base = 60;
  const entry_icon_y = margin.top + entry_icon_y_base + entry_row_height * index;

  tooltip
    .append("rect")
    .attr("fill", color)
    .attr("x", entry_icon_x)
    .attr("y", entry_icon_y)
    .attr("rx", 4)
    .attr("width", 12)
    .attr("height", 8);

  const text_start_delta_x = 19;
  const entry_text_x = entry_icon_x + text_start_delta_x;

  const text_start_delta_y = 9;
  const entry_text_y = entry_icon_y + text_start_delta_y;

  const text_item = tooltip
    .append("text")
    .attr("x", entry_text_x)
    .attr("y", entry_text_y)
    .attr("fill", "black");

  return text_item;
}