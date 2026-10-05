const r = require("raylib");

function draw(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function isOverlapping(r1Start, r1Width, r2Start, r2Width) {
    const r1End = r1Start + r1Width;
    const r2End = r2Start + r2Width;

    return !(r1End < r2Start || r1Start > r2End);
}

function isOutOfBounds(st, width, lower, upper) {
    const end = st + width;
    return st < lower || end > upper;
}

module.exports = {
    draw,
    isOverlapping,
    isOutOfBounds,
};
