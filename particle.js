const r = require("raylib");
const range = require("./range.js");

function create(x, y, width, height) {
    return {
        x,
        y,
        width,
        height,
    };
}

function draw(p) {
    range.draw(p.x, p.y, p.width, p.height, r.SKYBLUE);
}

module.exports = {
    create,
    draw,
};
