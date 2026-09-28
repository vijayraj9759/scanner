const r = require("raylib");
const d = require("./detector.js");
const dA = require("./detectorA.js");
const dB = require("./detectorB.js");
const dC = require("./detectorC.js");
const p = require("./particles.js");

function isOverlapping(r1Start, r1Width, r2Start, r2Width) {
    const r1End = r1Start + r1Width;
    const r2End = r2Start + r2Width;

    return !(r1End < r2Start || r1Start > r2End);
}

function isOverlappingWithAnyFields(st, width) {
    return (
        isOverlapping(st, width, p.particleA_x, p.particleA_width) ||
        isOverlapping(st, width, p.particleB_x, p.particleB_width)
    );
}

function update() {
    dA.velocity = d.calculateVelocity(
        dA.x,
        dA.width,
        dA.lower,
        dA.upper,
        dA.velocity,
    );
    dA.x = d.calculatePosition(dA.x, dA.velocity);
    dA.hasDetected = isOverlappingWithAnyFields(dA.x, dA.width);

    dB.velocity = d.calculateVelocity(
        dB.x,
        dB.width,
        dB.lower,
        dB.upper,
        dB.velocity,
    );
    dB.x = d.calculatePosition(dB.x, dB.velocity);
    dB.hasDetected = isOverlappingWithAnyFields(dB.x, dB.width);

    dC.velocity = d.calculateVelocity(
        dC.y,
        dC.height,
        dC.lower,
        dC.upper,
        dC.velocity,
    );
    dC.y = d.calculatePosition(dC.y, dC.velocity);
    dC.hasDetected = isOverlapping(
        dC.y,
        dC.height,
        p.particleC_y,
        p.particleC_height,
    );
}

function drawHorizontalRange(x, width, color) {
    r.DrawRectangle(x, 0, width, r.GetScreenHeight(), color);
}

function drawVerticalRange(y, height, color) {
    r.DrawRectangle(0, y, r.GetScreenWidth(), height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawHorizontalRange(p.particleA_x, p.particleA_width, r.SKYBLUE);
    drawHorizontalRange(p.particleB_x, p.particleB_width, r.SKYBLUE);
    drawVerticalRange(p.particleC_y, p.particleC_height, r.SKYBLUE);

    drawHorizontalRange(dA.x, dA.width, d.chooseColor(dA.hasDetected));
    drawHorizontalRange(dB.x, dB.width, d.chooseColor(dB.hasDetected));
    drawVerticalRange(dC.y, dC.height, d.chooseColor(dC.hasDetected));

    r.EndDrawing();
}

function setup(width, height) {
    r.SetTraceLogLevel(r.LOG_NONE);
    const FPS = 60;

    r.InitWindow(width, height, "Scanner");
    r.SetTargetFPS(FPS);

    dA.x = 0;
    dA.lower = 0;
    dA.upper = width / 2;

    dB.x = width / 2;
    dB.lower = width / 2;
    dB.upper = width;

    dC.y = 0;
    dC.lower = 0;
    dC.upper = height;
}

function running() {
    return !r.WindowShouldClose();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    update,
    draw,
    running,
    teardown,
};
