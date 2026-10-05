const r = require("raylib");
const range = require("./range.js");

function draw(d) {
    const color = d.hasDetected ? r.RED : r.WHITE;
    range.draw(d.x, d.y, d.width, d.height, color);
}

function isOverlappingWithAnyFields(d, p1, p2) {
    return (
        range.isOverlapping(d.x, d.width, p1.x, p1.width) ||
        range.isOverlapping(d.x, d.width, p2.x, p2.width)
    );
}

function updatePositionV(d) {
    d.velocity = range.isOutOfBounds(d.x, d.width, d.lowerBound, d.upperBound)
        ? -d.velocity
        : d.velocity;

    d.x = d.x + d.velocity;
}

function updatePositionH(d) {
    d.velocity = range.isOutOfBounds(d.y, d.height, d.lowerBound, d.upperBound)
        ? -d.velocity
        : d.velocity;

    d.y = d.y + d.velocity;
}

function updateV(d, p1, p2) {
    updatePositionV(d);
    d.hasDetected = isOverlappingWithAnyFields(d, p1, p2);

    return d;
}

function updateH(d, p) {
    updatePositionH(d);
    d.hasDetected = range.isOverlapping(d.y, d.height, p.y, p.height);

    return d;
}

function create(x, y, width, height, lowerBound, upperBound, velocity) {
    const hasDetected = false;
    return {
        x,
        y,
        width,
        height,
        lowerBound,
        upperBound,
        velocity,
        hasDetected,
    };
}

module.exports = {
    create,
    draw,
    updateH,
    updateV,
};
